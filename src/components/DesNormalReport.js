import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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

const formatArabicTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return convertToArabicNumbers(`${hours}:${minutes}:${seconds}`);
};

const DesNormalReport = () => {
    const [leaves, setLeaves] = useState(null);
    const reportRef = useRef();
    const { id } = useParams(); // جلب ID من URL

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/GetAllNormalLeaves`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())

       .then(data => {
    console.log("البيانات الراجعة:", data);

    if (Array.isArray(data)) {
        const selectedLeave = data.find(item => item.id.toString() === id);
        console.log("الإجازة المطابقة:", selectedLeave);
        setLeaves(selectedLeave);
    } else {
        console.error("البيانات ليست Array:", data);
    }
});

    }, [id]);

    const getBorderClass = () => {
        if (!leaves) return "";
        if (leaves.leaveStatus === 0) return "border-primary";
        if (leaves.leaveStatus === 1) return "border-success";
        return "border-danger";
    };

    const handlePrintPDF = () => {
        const element = reportRef.current;
        const options = {
            margin: 0.5,
            filename: `تقرير إجازة ${convertToArabicNumbers(leaves.firstName)} ${convertToArabicNumbers(leaves.secondName)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        window.Swal?.fire({
            title: 'جاري تجهيز التقرير...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

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

    if (!leaves) return <p className="text-center mt-4">جاري تحميل بيانات الإجازة...</p>;

    return (
        <div className="container" dir="rtl" style={{ fontFamily: "Tahoma, Arial" }}>
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
                    <h5 className="text-bold">تقرير إجازة اعتيادية</h5>
                </div>

                <hr className={`${getBorderClass()}`} />

                <table className="m-0 table table-striped">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#F5F9FF" }}>المرجع</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>الاسم</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>تاريخ البدء</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>تاريخ الانتهاء</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>عدد الأيام</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>القائم بالعمل</th>
                            <th style={{ backgroundColor: "#F5F9FF" }}>ملحوظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{leaves.id ? convertToArabicNumbers(leaves.id.toString().slice(0, 6)) : "—"}</td>
                            <td>{leaves.userName || "—"}</td>
                            <td>{formatArabicDate(leaves.startDate)}</td>
                            <td>{formatArabicDate(leaves.endDate)}</td>
                            <td>{leaves.days ? convertToArabicNumbers(leaves.days) : "—"}</td>
                            <td>{leaves.coworkerName || "—"}</td>
                            <td>{leaves.notesFromEmployee || "—"}</td>
                        </tr>
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
