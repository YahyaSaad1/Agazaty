import React, { useEffect, useState, useRef } from "react";
import { BASE_API_URL, roleName, token } from "../server/serves";
import html2pdf from "html2pdf.js";
import University from "../Images/University.png";
import Faculty from "../Images/Faculty.png";

const convertToArabicNumbers = (str) => {
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

const CasualReport = ({ leaveID }) => {
    const [leave, setLeave] = useState(null);
    const reportRef = useRef();

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/CasualLeave/GetCasualLeaveById/${leaveID}`, {
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
        if (leave.leaveStatus === false) return "border-primary";
        if (leave.leaveStatus === true) return "border-success";
        return "border-danger";
    };

    const handlePrintPDF = () => {
        const element = reportRef.current;
        const options = {
            margin: 0.5,
            filename: `تقرير إجازة ${convertToArabicNumbers(leave.firstName)} ${convertToArabicNumbers(leave.secondName)} (عارضة).pdf`,
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
                    <h5 className="text-bold">تقرير إجازة {leave.firstName} {leave.secondName} العارضة</h5>
                </div>

                <hr className={`${getBorderClass()}`}/>

                <div>
                    <p><strong>الاسم الرباعي:</strong> {leave.userName}</p>
                    <p><strong>القسم:</strong> {leave.departmentName}</p>
                    <p><strong>رقم الهاتف:</strong> {convertToArabicNumbers(leave.phoneNumber)}</p>
                    {/* نفس المشكلة */}
                    <p><strong>المسمى الوظيفي:</strong> {leave.roleName}</p>

                    <hr className={`${getBorderClass()}`}/>

                    <p><strong>نوع الإجازة:</strong> {leave.leaveType}</p>
                    <p><strong>تاريخ إرسال الإجازة:</strong> {formatArabicDate(leave.requestDate)}</p>
                    <p><strong>وقت إرسال الإجازة:</strong> {formatArabicTime(leave.requestDate)}</p>
                    <p><strong>تاريخ بدء الإجازة:</strong> {leave.startDate ? formatArabicDate(leave.startDate) : "لم يُحدَّد بعد"}</p>
                    <p><strong>تاريخ نهاية الإجازة:</strong> {leave.endDate ? formatArabicDate(leave.endDate) : "لم يُحدَّد بعد"}</p>
                    <p><strong>عدد الأيام:</strong> {leave.days ? convertToArabicNumbers(leave.days) : "لم يُحدَّد بعد"}</p>
                    <p><strong>ملوحظات الإجازة:</strong> {leave.notes || "بدون"}</p>

                    <hr className={`${getBorderClass()}`}/>

                    {/* <p><strong>المدير المباشر:</strong> {leave.directManagerName}</p> */}
                    <p><strong>المدير المختص:</strong> {leave.generalManagerName}</p>
                    <p className="text-bold"><strong>حالة الإجازة: </strong>
                        <span className="text-success">
                            { leave.leaveStatus === false ? <span className="text-primary">في انتظار إحالة المدير المختص</span>
                            : <span className="text-success">مقبولة</span>}
                        </span>
                    </p>
                </div>
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handlePrintPDF}>تحميل التقرير PDF</button>
            </div>
        </div>
    );
};

export default CasualReport;
