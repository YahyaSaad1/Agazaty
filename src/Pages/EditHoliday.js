import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_API_URL, token } from "../server/serves";

function EditHoliday() {
    const { holidayID } = useParams();
    const navigate = useNavigate();
    const [holiday, setHoliday] = useState({ name: "", date: "" });

    useEffect(() => {
    fetch(`${BASE_API_URL}/api/Holiday/GetHolidayById/${holidayID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // تنسيق التاريخ ليظهر بصيغة YYYY-MM-DD
            const formattedDate = data.date ? data.date.slice(0, 10) : "";
            setHoliday({ ...data, date: formattedDate });
        })
        .catch((error) => console.error("خطأ في جلب البيانات:", error));
}, [holidayID]);


    const handleChange = (e) => {
        setHoliday({ ...holiday, [e.target.name]: e.target.value });
    };

    const updateHoliday = async (e) => {
        e.preventDefault();
    
        Swal.fire({
            title: `<span style='color:#0d6efd;'>هل أنت متأكد من تحديث ${holiday.name}؟</span>`,
            text: "لا يمكن التراجع عن هذا الإجراء!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، تحديث",
            cancelButtonText: "إلغاء",
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${BASE_API_URL}/api/Holiday/UpdateHoliday/${holidayID}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(holiday),
                    });
    
                    // إذا كانت الاستجابة تحتوي على خطأ
                    if (!response.ok) {
                        const data = await response.json();
                        const errorMessage = data.message || "لم يتم التحديث، حاول مجدداً.";
                        
                        Swal.fire({
                            title: "حدث خطأ!",
                            text: errorMessage,
                            icon: "error",
                            confirmButtonText: "حسنًا",
                            customClass: {
                                title: 'text-red',
                                confirmButton: 'blue-button',
                                cancelButton: 'red-button'
                            },
                            didOpen: () => {
                                const popup = document.querySelector('.swal2-popup');
                                if (popup) popup.setAttribute('dir', 'rtl');
                            }
                        });
                    } else {
                        Swal.fire({
                            title: `<span style='color:#0d6efd;'>تم التحديث بنجاح.</span>`,
                            icon: "success",
                            confirmButtonText: "عرض الاجازات",
                            confirmButtonColor: "#0d6efd",
                            customClass: {
                                title: 'text-blue',
                                confirmButton: 'blue-button',
                                cancelButton: 'red-button'
                            },
                            didOpen: () => {
                                const popup = document.querySelector('.swal2-popup');
                                if (popup) popup.setAttribute('dir', 'rtl');
                            }
                        }).then(() => navigate("/holidays"));
                    }
                } catch (error) {
                    console.error("خطأ أثناء التحديث:", error);
                    Swal.fire({
                        title: "خطأ في الاتصال!",
                        text: "تأكد من تشغيل السيرفر.",
                        icon: "error",
                        customClass: {
                            title: 'text-red',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button'
                            },
                        didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                        }
                    });
                }
            }
        });
    };
    

    return (
        <form>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">تعديل بيانات الاجازة</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="name" className="form-label">اسم الاجازة</label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="مثال: ثورة يناير"
                        value={holiday.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="date" className="form-label">تاريخ الاجازة</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={holiday.date}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button onClick={updateHoliday} className="btn btn-primary w-50">تحديث</button>
            </div>
        </form>
    );
}

export default EditHoliday;
