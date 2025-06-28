import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL, token } from "../server/serves";

function UpdateNormalLeave(props) {
    const { leaveID } = useParams();
    const leave = useLocation().state?.leave;
    const [endDate, setEndDate] = useState(() => {
    const rawDate = leave?.endDate;
    return rawDate ? rawDate.split("T")[0] : "";
});
    const [notesFromEmployee, setNotesFromEmployee] = useState("");

    const handleData = async (e) => {
        e.preventDefault();

        if (!leaveID || !endDate || !notesFromEmployee) {
            Swal.fire({
                title: "خطأ!",
                text: "يرجى ملء جميع الحقول المطلوبة",
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
            return;
        }
        const leaveData = {
            startDate: leaveID.toString(),
            endDate: endDate.toString(),
            notesFromEmployee: notesFromEmployee || "",
        };

        try {
            const response = await fetch(
                `${BASE_API_URL}/api/NormalLeave/UpdateNormalLeave/${leaveID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(leaveData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                    Swal.fire({
                    title: `فشل كسر الإجازة!`,
                    html: `${(errorData.messages || ["يرجى المحاولة لاحقًا"]).join("<br>")}`,
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
                return;
            } else{
                const errorData = await response.json();
                    Swal.fire({
                    title: "نجحت!",
                    text: `${errorData.message || "يرجى انتظار الموافقة"}`,
                    icon: "success",
                    confirmButtonText: "حسنًا",
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
                        window.location.href = "/des-requests/normal";
                    }
                })
            }
        } catch (error) {
            Swal.fire({
            title: "حدث خطأ أثناء إرسال الطلب",
            text: `${error}`,
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
        }
    };

    return (
        <div>
            <div className="zzz d-inline-block">
                <h2 className="m-0">كسر إجازة {leave.firstName} {leave.secondName}</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="endDate" className="form-label">تاريخ نهاية الإجازة</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" id="endDate" required />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="notes" className="form-label">
                            الملاحظات
                        </label>
                        <textarea
                            className="form-control"
                            value={notesFromEmployee}
                            onChange={(e) => setNotesFromEmployee(e.target.value)}
                            id="notes"
                            rows="1"
                            placeholder="اكتب ملاحظاتك"
                        ></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">
                        إرسال الطلب
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateNormalLeave;