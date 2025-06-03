import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import Swal from 'sweetalert2';
import { BASE_API_URL, roleName, token, UserData } from '../server/serves';

function NormalLeaveRequestManager() {
    const { id: LeaveID } = useParams();
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingLeave, setLoadingLeave] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        setLoadingLeave(true);
        fetch(`${BASE_API_URL}/api/NormalLeave/GetNormalLeaveById/${LeaveID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(async (res) => {
            if (res.status === 403) {
            window.location.href = "/error403";
            return;
            }
            if (res.status === 404) {
            window.location.href = "/error404";
            return;
            }
            const data = await res.json();
            setLeave(data);
        })
        .catch((err) => console.error("Error fetching leave data:", err))
        .finally(() => setLoadingLeave(false));
    }, [LeaveID]);

    useEffect(() => {
        if (leave && leave.userID) {
        setLoadingUser(true);
        fetch(`${BASE_API_URL}/api/Account/GetUserById/${leave.userID}`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Error fetching user data:", err))
            .finally(() => setLoadingUser(false));
        }
    }, [leave]);

    const showSwal = (icon, title, text) => {
        Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: 'حسنًا',
        customClass: {
            title: 'text-blue',
            confirmButton: 'blue-button',
            cancelButton: 'red-button',
        },
        didOpen: () => {
            const popup = document.querySelector('.swal2-popup');
            if (popup) popup.setAttribute('dir', 'rtl');
        },
        });
    };

    const updateDecision = (leaveID, isApproved, reason = "") => {
        let endpoint = "";
        let body = { disapproveReason: isApproved ? "" : reason };

        if (roleName === "عميد الكلية" || roleName === "أمين الكلية") {
        endpoint = `${BASE_API_URL}/api/NormalLeave/UpdategeneralManagerDecision/${leaveID}`;
        body.generalManagerDecision = isApproved;
        } else if (roleName === "هيئة تدريس" || roleName === "موظف" || UserData.position === 2) {
        endpoint = `${BASE_API_URL}/api/NormalLeave/UpdateDirectManagerDecision/${leaveID}`;
        body.directManagerDecision = isApproved;
        } else {
        showSwal('error', 'دور غير معروف!', 'لا يمكن تحديد نوع المدير لاتخاذ القرار.');
        return;
        }

        fetch(endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        })
        .then(async (res) => {
            if (res.status === 403) {
            window.location.href = "/error403";
            return;
            }
            if (res.status === 404) {
            window.location.href = "/error404";
            return;
            }
            const data = await res.json();
            if (!res.ok) {
            throw new Error(data.message || "فشل في تحديث القرار");
            }
            await Swal.fire({
            icon: 'success',
            title: isApproved ? 'تمت الموافقة بنجاح' : 'تم الرفض بنجاح',
            confirmButtonText: 'حسنًا',
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button',
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
            }
            });
            window.location.href = "/leave-record";
        })
        .catch((err) => {
            console.error("Error updating decision:", err);
            showSwal('error', 'حدث خطأ!', err.message || 'حدثت مشكلة أثناء إرسال القرار.');
        });
    };

    // **Loading Spinner with circle and "انتظر..." text**
    if (loadingLeave || loadingUser) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="position-relative" style={{ width: '4rem', height: '4rem' }}>
            <div className="spinner-border text-primary w-100 h-100" role="status"></div>
            <div
                className="position-absolute top-50 start-50 translate-middle text-primary fw-bold"
                style={{ fontSize: '0.75rem' }}
            >
                انتظر...
            </div>
            </div>
        </div>
        );
    }

    if (!leave) {
        return <p className="text-center text-danger">لم يتم العثور على بيانات الإجازة.</p>;
    }

    return (
        <div>
        <div className="d-flex mb-4 justify-content-between">
            <div className="zzz d-inline-block p-3 ps-5">
            <h2 className="m-0">{`إجازة ${leave.firstName || ''} ${leave.secondName || ''}`}</h2>
            </div>
            <div className="p-3">
            <BtnLink name='سجل الإجازات' link='/leave-record' class="btn btn-primary m-0 ms-2 mb-2" />
            </div>
        </div>

        <div className="row mt-5 d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
            <table className="m-0 table table-striped box2">
                <thead>
                <tr>
                    <th scope="col" className="pb-3" style={{ backgroundColor: '#F5F9FF' }}>حالة الطلب</th>
                    <th scope="col" className="text-start" style={{ backgroundColor: '#F5F9FF' }}>
                    {leave.holder === 1 ? (
                        <Btn name="المدير المباشر" class="btn-danger text-start" />
                    ) : leave.holder === 2 ? (
                        <Btn name="المدير المختص" class="btn-danger text-start" />
                    ) : leave.holder === 3 ? (
                        <Btn name="مقبولة" class="btn-success text-start" />
                    ) : (
                        <Btn name="معلقة" class="btn-danger text-start" />
                    )}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="col">اسم الموظف</th>
                    <th scope="col" className="text-start">{leave.userName || "غير متوفر"}</th>
                </tr>
                <tr>
                    <th scope="col">نوع الإجازة</th>
                    <th scope="col" className="text-start">{leave.leaveType}</th>
                </tr>
                <tr>
                    <th scope="col">رقم الهاتف</th>
                    <th scope="col" className="text-start">{loadingUser ? "جاري التحميل..." : (user?.phoneNumber || "غير متوفر")}</th>
                </tr>
                <tr>
                    <th scope="col">القسم</th>
                    <th scope="col" className="text-start">{loadingUser ? "جاري التحميل..." : (leave?.departmentName || "غير متوفر")}</th>
                </tr>
                <tr>
                    <th scope="col">القائم بالعمل</th>
                    <th scope="col" className="text-start">{leave.coworkerName || "غير متوفر"}</th>
                </tr>
                <tr>
                    <th scope="col">بداية الإجازة</th>
                    <th className="text-start">{leave.startDate ? new Date(leave.startDate).toLocaleDateString('ar-EG') : "غير متوفر"}</th>
                </tr>
                <tr>
                    <th scope="col">نهاية الإجازة</th>
                    <th className="text-start">{leave.endDate ? new Date(leave.endDate).toLocaleDateString('ar-EG') : "غير متوفر"}</th>
                </tr>
                <tr>
                    <th scope="col">عدد أيام الإجازة</th>
                    <th className="text-start">
                    {leave.days !== undefined
                        ? leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])
                        : "غير متوفر"}
                    </th>
                </tr>
                <tr>
                    <th scope="col">الملحوظات</th>
                    <th scope="col" className="text-start">
                    {leave.notesFromEmployee?.trim() ? leave.notesFromEmployee : "بدون"}
                    </th>
                </tr>
                <tr>
                    <th colSpan={2} className="text-center" style={{ backgroundColor: 'white' }}>
                    <button
                        className='btn btn-success w-50 ms-2'
                        onClick={() => {
                        Swal.fire({
                            title: 'هل أنت متأكد؟',
                            text: "هل تريد الموافقة على هذا الطلب؟",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، موافق',
                            cancelButtonText: 'إلغاء',
                            customClass: {
                            title: 'text-blue',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button',
                            },
                            didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                            updateDecision(leave.id, true);
                            }
                        });
                        }}
                    >
                        موافقة
                    </button>

                    <button
                        className='btn btn-danger w-25'
                        onClick={async () => {
                        const { value: reason } = await Swal.fire({
                            title: 'رفض الطلب!',
                            input: 'textarea',
                            inputLabel: 'سبب الرفض!',
                            inputPlaceholder: 'اكتب سبب الرفض هنا...',
                            inputAttributes: {
                            'aria-label': 'اكتب سبب الرفض هنا',
                            },
                            showCancelButton: true,
                            confirmButtonText: 'رفض',
                            cancelButtonText: 'إلغاء',
                            customClass: {
                            title: 'text-red',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button',
                            },
                            didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                            },
                        });

                        if (reason) {
                            updateDecision(leave.id, false, reason);
                        }
                        }}
                    >
                        رفض
                    </button>
                    </th>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}

export default NormalLeaveRequestManager;
