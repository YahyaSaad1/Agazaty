import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BASE_API_URL, token, userID } from "../server/serves";

function CasualLeave() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");
    const [maxEndDate, setMaxEndDate] = useState("");
    const [maxStartDate, setMaxStartDate] = useState("");

    useEffect(() => {
        const today = new Date();
        setMaxStartDate(today.toISOString().split("T")[0]);
    }, []);

    useEffect(() => {
        if (startDate) {
            const start = new Date(startDate);
            const maxEnd = new Date(start);
            maxEnd.setDate(start.getDate() + 1);

            const today = new Date();
            const finalMax = maxEnd > today ? today : maxEnd;

            setMaxEndDate(finalMax.toISOString().split("T")[0]);
        } else {
            setMaxEndDate("");
        }
    }, [startDate]);

    const handleData = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !userID) {
            Swal.fire({
                title: "خطأ!",
                text: "يرجى ملء جميع الحقول المطلوبة",
                icon: "error",
                confirmButtonText: "حسنًا",
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }
        
        if (new Date(startDate) > new Date()) {
            Swal.fire({
                title: "خطأ!",
                text: "لا يمكن اختيار تاريخ بداية في المستقبل",
                icon: "error",
                confirmButtonText: "حسنًا",
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }
        
        if (new Date(endDate) > new Date()) {
            Swal.fire({
                title: "خطأ!",
                text: "لا يمكن اختيار تاريخ نهاية في المستقبل",
                icon: "error",
                confirmButtonText: "حسنًا",
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }
        
        if (new Date(endDate) < new Date(startDate)) {
            Swal.fire({
                title: "خطأ!",
                text: "تاريخ النهاية لا يمكن أن يكون قبل تاريخ البداية",
                icon: "error",
                confirmButtonText: "حسنًا",
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
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            userID: userID.toString(),
            notes: notes.toString(),
        };

        try {
            const response = await fetch(
                `${BASE_API_URL}/api/CasualLeave/CreateCasualLeave`,
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
            }else {
                const successData = await response.json();

                Swal.fire({
                    title: "نجاح!",
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
                    window.location.href = "agazaty/casual";
                });
            }
            } catch (error) {

            Swal.fire({
                title: "خطأ!",
                text: "حدث خطأ أثناء إرسال الطلب",
                icon: "error",
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
            });
        }
        
    };

    return (
        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">طلب اجازة عارضة</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="startDate" className="form-label">
                            تاريخ بداية الاجازة
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setEndDate(""); // تصفير النهاية لما المستخدم يغير البداية
                            }}
                            className="form-control"
                            id="startDate"
                            required
                            max={maxStartDate}
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="endDate" className="form-label">
                            تاريخ نهاية الاجازة
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-control"
                            id="endDate"
                            required
                            min={startDate}
                            max={maxEndDate}
                            disabled={!startDate} // عدم تفعيل حقل النهاية إلا بعد اختيار البداية
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="notes" className="form-label">
                            الملاحظات
                        </label>
                        <textarea
                            className="form-control"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
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

export default CasualLeave;
