import React, { useEffect, useState, useRef } from "react";
import { BASE_API_URL, token } from "../server/serves";
import html2pdf from "html2pdf.js";
import University from "../Images/University.png";
import Faculty from "../Images/Faculty.png";
import Swal from "sweetalert2";

const convertToArabicNumbers = (str) => {
    return str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};

const formatArabicDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatted = date.toLocaleDateString('ar-EG', options);
    return convertToArabicNumbers(formatted);
};

const DesSickReport = ({status}) => {
    const [leaves, setLeaves] = useState([]);
    const reportRef = useRef();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
            const res = await fetch(
                `${BASE_API_URL}/api/SickLeave/GetAllSickLeave`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                }
            );
            const data = await res.json();
            if (Array.isArray(data)) {
                setLeaves(data);
            } else {
                console.error("البيانات ليست Array:", data);
            }
            } catch (err) {
            console.error("خطأ أثناء الجلب:", err);
            }
        };

        fetchLeaves();
    }, [token]);

    const getBorderClass = () => {
        if (status == null) return "";
        if (status === 3) return "border-dark";
        if (status === 2) return "border-danger";
        if (status === 1) return "border-success";
        return "border-primary";
    };

    const handlePrintPDF = () => {
        const element = reportRef.current;

        const options = {
            margin: 10,
            filename: "تقرير الإجازات المرضية.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                onclone: (clonedDoc) => {
                clonedDoc.documentElement.dir = "rtl";
                clonedDoc.body.style.direction = "rtl";
                clonedDoc.querySelectorAll("table").forEach(t => t.setAttribute("dir", "rtl"));
                },
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
            pagebreak: {
                mode: ["avoid-all"],
                avoid: "tr"
            }
            };

        Swal.fire({
            title: "جاري تجهيز التقرير...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        setTimeout(() => {
            html2pdf()
            .set(options)
            .from(element)
            .save()
            .then(() => Swal.close());
        }, 500);
    };

    if (!leaves) return <p className="text-center mt-4">جاري تحميل بيانات الإجازة...</p>;

    return (
        <div className="container" dir="rtl" style={{fontFamily: "cairo, Arial"}}>
            <div className={`border border-2 rounded p-4 shadow-sm bg-white text-end ${getBorderClass()}`} ref={reportRef}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
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
                    {status === 0 ? <h5 className="text-bold">تقرير الإجازات المرضية المُعلقة</h5>
                    : status === 1 ? <h5 className="text-bold">تقرير الإجازات المرضية المُستحقة</h5>
                    : status === 2 ? <h5 className="text-bold">تقرير الإجازات المرضية الغير مُستحقة</h5>
                    : <h5 className="text-bold">تقرير لكل الإجازات المرضية</h5>}
                </div>

                <hr className={`${getBorderClass()}`} />

                <table className="m-0 table table-striped">
                    <thead>
                        <tr>
                            <th className="th-mult">المرجع</th>
                            <th className="th-mult">الاسم</th>
                            <th className="th-mult">تاريخ البدء</th>
                            <th className="th-mult">تاريخ الانتهاء</th>
                            <th className="th-mult">عدد الأيام</th>
                            <th scope="col" className="th-mult">حالة الطلب</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves?.filter((leave) => {
                            if (status === 0) return (leave.responseDoneFinal === false);
                            if (status === 2) return (leave.certified === false && leave.responseDoneFinal === true) ;
                            if (status === 1) return leave.certified === true;
                            return true;
                            }).map((leave, index) => (
                                <tr key={index}>
                                    <td>#{(index + 1).toLocaleString("ar-EG")}</td>
                                    <td>{leave.userName || "--"}</td>
                                    <td>{formatArabicDate(leave.startDate)}</td>
                                    <td>{formatArabicDate(leave.endDate)}</td>
                                    <td>{leave.days ? convertToArabicNumbers(leave.days) : "--"}</td>
                                    <th>
                                        {leave.certified === true ? (
                                            <th className="text-success">مُستحقة</th>
                                        ) : leave.responseDoneFinal === false &&
                                            leave.respononseDoneForMedicalCommitte === false ? (
                                            <th className="text-primary">
                                            مُعلقة عند التحديث الأول
                                            </th>
                                        ) : leave.responseDoneFinal === false &&
                                            leave.respononseDoneForMedicalCommitte === true ? (
                                            <th className="text-primary">
                                            مُعلقة عند التحديث الثاني
                                            </th>
                                        ) : (
                                            <th className="text-danger">غير مُستحقة</th>
                                        )}
                                    </th>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handlePrintPDF}>
                    تحميل التقرير PDF
                </button>
            </div>
        </div>
    );
};

export default DesSickReport;
