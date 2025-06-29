import React, { useEffect, useState, useRef } from "react";
import { BASE_API_URL, roleName, token } from "../server/serves";
import html2pdf from "html2pdf.js";
import University from "../Images/University.png";
import Faculty from "../Images/Faculty.png";

const convertToArabicNumbers = (str) => {
    if (str == null) return '';
    return str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};


const formatArabicDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatted = date.toLocaleDateString('ar-EG', options);
    return convertToArabicNumbers(formatted);
};

const formatArabicTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return convertToArabicNumbers(`${hours}:${minutes}:${seconds}`);
};

const SickReport = ({ leaveID }) => {
    const [leave, setLeave] = useState(null);
    const reportRef = useRef();

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/SickLeave/GetSickLeaveById/${leaveID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => setLeave(data));
    }, [leaveID]);

    const getBorderClass = () => {
        if (leave.responseDoneFinal === false) return "border-primary";
        if (leave.certified === true) return "border-success";
        return "border-danger";
    };

    const handlePrintPDF = () => {
        const element = reportRef.current;
        const options = {
            margin: 0.5,
            filename: `تقرير إجازة ${convertToArabicNumbers(leave.firstName)} ${convertToArabicNumbers(leave.secondName)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).outputPdf('blob').then(pdfBlob => {
            const blobUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = options.filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);

            setTimeout(() => {
                window.Swal?.close();
            }, 1000);
        });
    };

    if (!leave) return <p className="text-center mt-4">جاري تحميل بيانات الإجازة...</p>;
    console.log(leave)

    return (
        <div className="container" dir="rtl" style={{ fontFamily: "cairo, Arial" }}>
            <div className={`border border-2 rounded p-4 shadow-sm bg-white text-end ${getBorderClass()}`} ref={reportRef} style={{ direction: "rtl" }} >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem"
                }}>
                    <div style={{ textAlign: "center" }}>
                        <img src={University} alt="جامعة" style={{ height: 80, objectFit: "contain" }} />
                        <div style={{ fontWeight: "bold", marginTop: 5 }}>جامعة قنا</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img src={Faculty} alt="كلية" style={{ height: 80, objectFit: "contain" }} />
                        <div style={{ fontWeight: "bold", marginTop: 5 }}>كلية الحاسبات والمعلومات</div>
                    </div>
                </div>

                <div className="text-center">
                    <h5 className="text-bold">تقرير إجازة مرضية</h5>
                </div>

                <hr className={`${getBorderClass()}`}/>

                <div>
                    <p><strong>الاسم الرباعي:</strong> {leave.userName}</p>
                    <p><strong>القسم:</strong> {leave.departmentName}</p>
                    <p><strong>رقم الهاتف:</strong>{convertToArabicNumbers(leave.phoneNumber)}</p>
                    <p><strong>المسمى الوظيفي:</strong> {roleName}</p>

                    <hr className={`${getBorderClass()}`}/>

                    <p><strong>نوع الإجازة:</strong> {leave.leaveType}</p>
                    <p><strong>ملاحظات المرض:</strong> {leave.disease}</p>
                    <p><strong>عنوان الإقامة:</strong> {leave.governorate} - {leave.state} - {leave.street}</p>
                    <p><strong>تاريخ إرسال الإخطار:</strong> {formatArabicDate(leave.requestDate)}</p>
                    <p><strong>وقت إرسال الإخطار:</strong> {formatArabicTime(leave.requestDate)}</p>
                    <p><strong>ملوحظات الإجازة:</strong> {leave.notesFromEmployee || "بدون"}</p>

                    {leave.responseDoneFinal === true &&
                    <>
                        <hr className={`${getBorderClass()}`}/>
                        <p><strong>عنوان القومسيون الطبي:</strong> {leave.medicalCommitteAddress? leave.medicalCommitteAddress : "لم يُحدد بعد"}</p>
                        <p><strong>نوع المرض: </strong>{leave.responseDoneFinal ? (leave.chronic ? "مزمن" : "غير مزمن") : "لم يُحدد بعد"}</p>
                        <p><strong>تاريخ بدء الإجازة:</strong> {leave.startDate === "0001-01-01T00:00:00" ?  "لم يُحدَّد بعد" : formatArabicDate(leave.startDate)}</p>
                        <p><strong>تاريخ نهاية الإجازة:</strong> {leave.endDate === "0001-01-01T00:00:00" ?  "لم يُحدَّد بعد" : formatArabicDate(leave.endDate)}</p>
                        <p><strong>عدد أيام الإجازة:</strong> {leave.days ? convertToArabicNumbers(leave.days) : "لم يُحدَّد بعد"}</p>
                    </>}

                    <hr className={`${getBorderClass()}`}/>

                    <p><strong>المدير المختص:</strong> {leave.generalManagerName}</p>
                    <p className="text-bold"><strong>حالة الإجازة: </strong>
                        <span className="text-success">
                            { leave.generalManagerDecision === false ? <span className="text-primary">في انتظار إحالة المدير المختص</span>
                            : leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === false ? <span className="text-primary">مُعلقة عند التحديث الأول</span>
                            : leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === true ? <span className="text-primary">مُعلقة عند التحديث الثاني</span>
                            : leave.certified === true ? <span className="text-success">مُستحقة</span>
                            : <span className="text-danger">غير مُستحقة</span>}
                        </span>
                    </p>
                </div>
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handlePrintPDF}>
                    تحميل التقرير PDF
                </button>
            </div>
        </div>
    );
};

export default SickReport;
