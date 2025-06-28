import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL, token } from "../server/serves";

function UpdateSickLeave() {
    const { leaveID } = useParams();
    const [address, setAddress] = useState('');
    const [leave, setLeave] = useState([]);

    useEffect(() => {
        const fetchSickLeaveById = async () => {
            try {
            const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetSickLeaveById/${leaveID}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // إضافة التوكن هنا
                },
            });
    
            const data = await response.json();
            setLeave(data);
            } catch (error) {
            console.error("Error fetching sick leave by ID:", error);
            }
        };
        fetchSickLeaveById();
        }, []);

    const handleData = async (e) => {
    e.preventDefault();

    if (!leaveID || address === "") {
        Swal.fire({
            title: "خطأ!",
            text: "يرجى ملء جميع الحقول المطلوبة!",
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
    }

    const confirmResult = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد فعلاً تحديث الإخطار؟",
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
    });

    if (!confirmResult.isConfirmed) {
        return;
    }

    const leaveData = {
        leaveID: leaveID,
        address: address.toString(),
    };

    try {
        const response = await fetch(
            `${BASE_API_URL}/api/SickLeave/UpdateMedicalCommiteAddressResponse/${leaveID}/${address}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, // إضافة التوكن هنا
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(leaveData),
            }
        );

        if (response.status === 403) {
            window.location.href = "/error403";
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            Swal.fire({
                title: "خطأ!",
                text: `فشل إرسال الطلب: ${errorData.message || "يرجى المحاولة لاحقًا"}`,
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
        } else {
            const responseData = await response.json();
            Swal.fire({
                title: "تم إرسال الطلب بنجاح!",
                text: `${responseData.message || "يرجى انتظار الموافقة"}`,
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
            })
            .then(() => {
                window.location.href = "record/sick-leaves";
            });
        }
    } catch (error) {
        Swal.fire({
            title: "خطأ!",
            text: "حدث خطأ أثناء إرسال الطلب",
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
        console.error("Error:", error);
    }
};

    return (
        <div>
            <div className="zzz d-inline-block">
                <h2 className="m-0">تحديث إجازة {leave.firstName} {leave.secondName}</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="address" className="form-label">
                        عنوان القومسيون الطبي
                        </label>
                        <textarea
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            rows="1"
                            placeholder="اكتب عنوان القومسيون الطبي"
                        ></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">
                        تحديث الاخطار
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateSickLeave;