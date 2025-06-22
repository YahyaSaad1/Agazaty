import React, { useEffect, useState, useRef } from "react";
import { BASE_API_URL, token } from "../server/serves";
import html2pdf from "html2pdf.js";

const convertToArabicNumbers = (str) => {
    if (str == null) return '';
    return str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};

const PermitReport = ({ permitID }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const reportRef = useRef();

    useEffect(() => {
        const fetchPermitLeaveImage = async () => {
            try {
                const res = await fetch(
                    `${BASE_API_URL}/api/PermitLeave/GetPermitLeaveImageByLeaveId/${permitID}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                setImageUrl(data.imageUrl);
            } catch (err) {
                console.error("Error fetching leave image:", err);
            } finally {
                setLoading(false);
            }
        };

        if (permitID) {
            fetchPermitLeaveImage();
        }
    }, [permitID]);

    // تحميل الصورة فقط
    const handleDownloadImage = () => {
        if (!imageUrl) return;

        const link = document.createElement('a');
        link.href = `${BASE_API_URL}${imageUrl}`;
        const fileExtension = imageUrl.split('.').pop(); // استخراج الامتداد تلقائياً
        link.download = `تصريح-${convertToArabicNumbers(permitID)}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            window.Swal?.close?.();
        }, 1000);
    };

    // تحميل PDF من المكون الكامل
    const handleDownloadPDF = () => {
        const element = reportRef.current;
        const options = {
            margin: 0.5,
            filename: `تقرير تصريح-${convertToArabicNumbers(permitID)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();

        setTimeout(() => {
            window.Swal?.close?.();
        }, 1000);
    };

    if (loading) return <p className="text-center mt-4">جاري تحميل بيانات التصريح...</p>;

    return (
        <div className="container" dir="rtl" style={{ fontFamily: "Tahoma, Arial" }}>
            <div className="mt-4 border p-3" ref={reportRef} id="report-content">
                {imageUrl ? (
                    <div className="text-center">
                        <img
                            src={`${BASE_API_URL}${imageUrl}`}
                            alt="صورة التصريح"
                            className="img-fluid"
                            style={{ maxHeight: '600px' }}
                        />
                    </div>
                ) : (
                    <p className="text-center text-danger">لم يتم العثور على صورة للتصريح</p>
                )}

                <div className="text-center mt-3 d-flex justify-content-center gap-2 flex-wrap">
                    <button className="btn btn-success" onClick={handleDownloadImage}>
                        تحميل صورة التصريح
                    </button>
                    <button className="btn btn-primary" onClick={handleDownloadPDF}>
                        تحميل التقرير PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermitReport;
