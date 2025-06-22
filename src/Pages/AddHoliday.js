import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_API_URL, token } from "../server/serves";

function AddHoliday() {
    const clickedDate = localStorage.getItem("clickedDate") || "";
    const [name, setName] = useState('');
    const [date, setDate] = useState(clickedDate);

    const handleData = () => {
        const newHoliday = { name, date };

        fetch(`${BASE_API_URL}/api/Holiday/CreateHoliday`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newHoliday),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
            Swal.fire({
                title: `<span style='color:red;'>${data.message}</span>`,
                text: "يرجى المحاولة مرة أخرى!",
                icon: "error",
                confirmButtonText: "حسناً",
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
                title: `<span style='color:#0d6efd;'>تمت إضافة الإجازة بنجاح.</span>`,
                icon: "success",
                confirmButtonText: "مشاهدة الإجازات",
                customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button'
                },
                didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
                }
            }).then((result) => {
                if (result.isConfirmed) {
                window.location.reload();
                window.location.href = "/holidays";
                }
            });
            }
        })
        .catch((error) => {
            console.error("خطأ أثناء الإضافة:", error);
            Swal.fire({
            title: `<span style='color:red;'>خطأ في الإضافة!</span>`,
            text: "حدث خطأ أثناء حفظ البيانات. حاول مرة أخرى.",
            icon: "error",
            confirmButtonText: "حسناً",
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
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
        title: `<span style='color:#0d6efd; font-size:28px;'>هل أنت متأكد من إنشاء إجازة رسمية؟</span>`,
        html: `
            <p dir='rtl'><span style='font-weight: bold;'>اسم الإجازة:</span> <span style='color:#0d6efd;'>${name}</span></p>
            <p dir='rtl'><span style='font-weight: bold;'>تاريخ الإجازة:</span> <span style='color:#0d6efd;'>${new Date(date).toLocaleDateString('ar-EG')}</span></p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، متأكد",
        cancelButtonText: "لا",
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
        }).then((result) => {
        if (result.isConfirmed) {
            handleData();
        }
        });
    };

    return (
        <div>
        <div className="zzz d-inline-block p-3 ps-5">
            <h2 className="m-0">إضافة إجازة رسمية</h2>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-sm-12 col-md-6 mt-3">
                <label htmlFor="holidayName" className="form-label">اسم الإجازة</label>
                <input
                required
                className="form-control"
                type="text"
                id="holidayName"
                placeholder="مثال: ثورة يناير"
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="col-sm-12 col-md-6 mt-3">
                <label htmlFor="holidayDate" className="form-label">تاريخ الإجازة</label>
                <input
                required
                type="date"
                className="form-control"
                id="holidayDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary w-50">إنشاء</button>
            </div>
        </form>
        </div>
    );
}

export default AddHoliday;