import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_API_URL, token, userID } from "../server/serves";

function SickLeave() {
    const [disease, setDisease] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [governorate, setGovernorate] = useState("");

    const handleData = async (e) => {
        e.preventDefault();
    
        if (!disease || !street || !governorate || !state || !userID) {
            Swal.fire({
                title: "خطأ!",
                text: "يرجى ملء جميع الحقول المطلوبة!",
                icon: "error",
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button',
                    
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });

            return;
        }

        const result = await Swal.fire({
            title: 'هل أنت متأكد من إرسال الطلب؟',
            text: "لا يمكن التراجع عن هذا الإجراء!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، إرسال',
            cancelButtonText: 'إلغاء',
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

    
        if (!result.isConfirmed) {
            return;
        }
    
        const leaveData = {
            disease: disease,
            street: street,
            governorate: governorate,
            state: state,
            userID: userID,
        };
    
        try {
            const response = await fetch(
                `${BASE_API_URL}/api/SickLeave/CreateSickLeave`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(leaveData),
                }
            );
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                Swal.fire({
                    title: "فشل إرسال الطلب!",
                    text: `${errorData.message || "يرجى المحاولة لاحقًا"}`,
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
                const successData = await response.json();
                Swal.fire({
                    title: "نجحت!",
                    text: `تم إرسال الطلب: ${successData.message || "يرجى انتظار الموافقة"}`,
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
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            Swal.fire({
                title: "فشل إرسال الطلب",
                text: `${error || "يرجى المحاولة لاحقًا"}`,
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
                <h2 className="m-0">طلب إجازة مرضية</h2>
            </div>

            <form onSubmit={handleData}>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="disease" className="form-label">
                                سبب البلاغ
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}
                                id="disease"
                                rows="1"
                                placeholder="مثال: صداع"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                المحافظة
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={governorate}
                                onChange={(e) => setGovernorate(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="مثال: قنا"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="state" className="form-label">
                                المركز / المدينة
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                id="state"
                                rows="1"
                                placeholder="مثال: قوص"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="street" className="form-label">
                                القرية / الشارع
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                id="street"
                                rows="1"
                                placeholder="مثال: طريق الشوادر بجوار قاعة شهرزاد"
                            />
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

export default SickLeave;