import React, { useEffect, useState } from "react";
import { BASE_API_URL, token, userID } from "../server/serves";
import Swal from "sweetalert2";
import LoadingOrError from "../components/LoadingOrError";

function Message() {
    const [leaveWating, setLeaveWating] = useState(null);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByCoWorkerID/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message || 'حدث خطأ في جلب البيانات'); });
            }
            return res.json();
        })
        .then((data) => {
            setLeaveWating(data);
        })
        .catch((error) => {
            console.error("Error fetching leave data:", error);
            setLeaveWating([]);
        });
    }, [userID]);

    const updateDecision = (leaveID, CoworkerDecision) => {
        const actionText = CoworkerDecision ? "الموافقة" : "الرفض";

        Swal.fire({
            title: `هل أنت متأكد من ${actionText}؟`,
            text: "لن تتمكن من التراجع بعد ذلك!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم، موافقة",
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
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${BASE_API_URL}/api/NormalLeave/UpdateCoworkerDecision/${leaveID}?CoworkerDecision=${CoworkerDecision}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "فشل في تحديث القرار");
                    }
                    Swal.fire({
                        title: "تم التحديث بنجاح!",
                        icon: "success",
                        confirmButtonText: "موافق",
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
                })
                .catch((err) => {
                    Swal.fire({
                        title: "خطأ!",
                        text: err.message,
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
            }
        });
    };

    if (!leaveWating || leaveWating.length === 0) {
        return <LoadingOrError data={leaveWating} />;
    }


    return (
        <div className="row">
            <div className="p-0">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات القيام بالعمل</h2>
                </div>
            </div>
            {(Array.isArray(leaveWating) && leaveWating.length > 0) && (
                leaveWating.map((leave, index) => (
                    <div className="mt-3" key={index}>
                        <div className="box mt-3 col-sm-12 col-md-10 col-lg-8">
                            <h5>
                                طلب اجازة جديد من{" "}
                                <span className="text-primary">{leave.userName}</span> في انتظار موافقتك
                            </h5>
                            <p>
                                من يوم {new Date(leave.startDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })} إلى يوم{" "}
                                {new Date(leave.endDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </p>
                            <p>ملحوظات الزميل : {leave.notesFromEmployee || "بدون"}</p>

                            <button className="btn btn-primary m-2 w-25" onClick={() => updateDecision(leave.id, true)}>
                                موافقة
                            </button>
                            <button className="btn btn-danger" onClick={() => updateDecision(leave.id, false)}>
                                رفض
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Message;
