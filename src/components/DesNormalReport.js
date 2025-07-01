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

const DesNormalReport = ({status}) => {
    const [leaves, setLeaves] = useState([]);
    const reportRef = useRef();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
            const res = await fetch(
                `${BASE_API_URL}/api/NormalLeave/GetAllNormalLeaves`,
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
        if (status === 0) return "border-primary";
        if (status === 1) return "border-success";
        if (status === 2) return "border-danger";
        return "border-dark";
    };


    const handlePrintPDF = () => {
        const element = reportRef.current;

        const statusMap = {
            0: "المُعلقة",
            1: "المقبولة",
            2: "المرفوضة",
            };

        const fileName =
        status in statusMap
            ? `تقرير الإجازات الاعتيادية ${statusMap[status]}.pdf`
            : "تقرير لكل الإجازات الاعتيادية.pdf";

        const options = {
        margin: 10,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
            scale: 2,
            onclone: (clonedDoc) => {
            clonedDoc.documentElement.dir = "rtl";
            clonedDoc.body.style.direction = "rtl";
            clonedDoc
                .querySelectorAll("table")
                .forEach((t) => t.setAttribute("dir", "rtl"));
            },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        pagebreak: {
            mode: ["avoid-all"],
            avoid: "tr",
        },
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
                    {status === 0 ? <h5 className="text-bold">تقرير الإجازات الاعتيادية المُعلقة</h5>
                    : status === 1 ? <h5 className="text-bold">تقرير الإجازات الاعتيادية المقبولة</h5>
                    : status === 2 ? <h5 className="text-bold">تقرير الإجازات الاعتيادية المرفوضة</h5>
                    : <h5 className="text-bold">تقرير لكل الإجازات الاعتيادية</h5>}
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
                            <th className="th-mult">القائم بالعمل</th>
                            <th className="th-mult">ملحوظات</th>
                            <th className="th-mult">حالة الطلب</th>
                        </tr>
                    </thead>
                    <tbody>
                    {leaves
                        ?.filter((leave) => {
                        if (status === 2) return leave.leaveStatus === 2;
                        if (status === 1) return leave.leaveStatus === 1;
                        if (status === 0) return leave.leaveStatus === 0;
                        return true;
                        })
                        .map((leave, index) => (
                        <tr key={leave.id ?? index}>
                            <td>#{(index + 1).toLocaleString("ar-EG")}</td>
                            <td>{leave.userName || "--"}</td>
                            <td>{formatArabicDate(leave.startDate)}</td>
                            <td>{formatArabicDate(leave.endDate)}</td>
                            <td>{leave.days ? convertToArabicNumbers(leave.days) : "--"}</td>
                            <td>{leave.coworkerName || "--"}</td>
                            <td>{leave.notesFromEmployee || "بدون"}</td>

                            {leave.leaveStatus === 0 ? (
                            <th className="text-primary">مُعلَّقة</th>
                            ) : leave.leaveStatus === 1 ? (
                            <th className="text-success">مقبولة</th>
                            ) : (
                            <th className="text-danger">مرفوضة</th>
                            )}
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

export default DesNormalReport;
