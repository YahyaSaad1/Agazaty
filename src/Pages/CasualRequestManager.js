import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import Swal from 'sweetalert2';
import { BASE_API_URL, token } from '../server/serves';

function CasualRequestManager() {
    const LeaveID = useParams().id;
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/CasualLeave/GetCasualLeaveById/${LeaveID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
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
            .catch((err) => console.error("Error fetching leave data:", err));
    }, [LeaveID]);

    useEffect(() => {
        if (leave && leave.userID) {
            fetch(`${BASE_API_URL}/api/Account/GetUserById/${leave.userID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [leave]);

    const updateDecision = (leaveID, isApproved, reason = "") => {
        const body = {
            generalManagerDecision: isApproved,
            disapproveReason: isApproved ? "" : reason
        };

        fetch(`${BASE_API_URL}/api/CasualLeave/UpdateGeneralManagerDecicion/${leaveID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
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

                Swal.fire({
                    icon: 'success',
                    title: isApproved ? 'تمت الموافقة بنجاح' : 'تم الرفض بنجاح',
                    confirmButtonText: 'حسنًا',
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
                    window.location.href = "/record/casual/leave";
                });
            })
            .catch((err) => {
                console.error("Error updating decision:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ!',
                    text: err.message || 'حدثت مشكلة أثناء إرسال القرار.',
                    confirmButtonText: 'حسنًا',
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
            });
    };

    if (!leave) {
        return <p className="text-center mt-5">جاري تحميل بيانات الإجازة...</p>;
    }

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0">{`إجازة ${leave.firstName} ${leave.secondName}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل الإجازات' link='/leave-record' className="btn btn-primary m-0 ms-2 mb-2" />
                </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{ backgroundColor: '#F5F9FF' }}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{ backgroundColor: '#F5F9FF' }}>
                                    {leave.holder === 1 ? <Btn name="المدير المباشر" className="btn-danger text-start" />
                                        : leave.holder === 2 ? <Btn name="المدير المختص" className="btn-danger text-start" />
                                            : leave.holder === 3 ? <Btn name="مقبولة" className="btn-success text-start" />
                                                : <Btn name="مُعلقة" className="btn-primary text-start" />}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">اسم الموظف</th>
                                <th scope="col" className="text-start">{leave.userName}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الإجازة</th>
                                <th scope="col" className="text-start">عارضة</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">{user ? user.departmentName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">بداية الإجازة</th>
                                <th className="text-start">{new Date(leave.startDate).toLocaleDateString('ar-EG')}</th>
                            </tr>
                            <tr>
                                <th scope="col">نهاية الإجازة</th>
                                <th className="text-start">{new Date(leave.endDate).toLocaleDateString('ar-EG')}</th>
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
                                <th scope="col" className="text-start">{leave.notesFromEmployee || "بدون"}</th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="text-center" style={{ backgroundColor: 'white' }}>
                                    <button
                                        className='btn btn-success w-75 ms-2'
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
                                                    cancelButton: 'red-button'
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
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CasualRequestManager;