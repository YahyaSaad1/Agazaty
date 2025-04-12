import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import Swal from 'sweetalert2';

function NormalLeaveRequestManager() {
    const [leaveWating, setLeaveWating] = useState([]);
    const LeaveID = useParams().id;
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);
    const [disapproveReason, setDisapproveReason] = useState("");

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetNormalLeaveById/${LeaveID}`)
            .then((res) => res.json())
            .then((data) => {
                setLeave(data);
            })
            .catch((err) => console.error("Error fetching leave data:", err));
    }, [LeaveID]);

    useEffect(() => {
        if (leave && leave.userID) {
            fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${leave.userID}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [leave]);

    const updateDecision = (leaveID, isApproved, reason = "") => {
        const body = {
            directManagerDecision: isApproved,
            disapproveReason: isApproved ? "" : reason
        };

        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/UpdateDirectManagerDecision/${leaveID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update decision");
                }
                return res.json();
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: isApproved ? 'تمت الموافقة بنجاح' : 'تم الرفض بنجاح',
                    confirmButtonText: 'حسنًا'
                });
            })
            .catch((err) => {
                console.error("Error updating decision:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ!',
                    text: 'حدثت مشكلة أثناء إرسال القرار.',
                    confirmButtonText: 'حسنًا'
                });
            });
    };

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`الاجازة رقم #${LeaveID}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل الاجازات' link='/leave-record' class="btn btn-primary m-0 ms-2 mb-2" />
                </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{ backgroundColor: '#F5F9FF' }}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{ backgroundColor: '#F5F9FF' }}>
                                    {leave ? (
                                        leave.holder === 1 ? <Btn name="المدير المباشر" class="btn-danger text-start" />
                                            : leave.holder === 2 ? <Btn name="المدير المختص" class="btn-danger text-start" />
                                                : leave.holder === 3 ? <Btn name="مقبولة" class="btn-danger text-start" />
                                                    : <Btn name="معلقة" class="btn-danger text-start" />
                                    ) : "جاري التحميل..."}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">اسم الموظف</th>
                                <th scope="col" className="text-start">{leave ? leave.userName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الاجازة</th>
                                <th scope="col" className="text-start">اعتيادية</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{user ? user.phoneNumber : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">{user ? user.departmentName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">القائم بالعمل</th>
                                <th scope="col" className="text-start">{leave ? leave.coworkerName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">تاريخ بداية الاجازة</th>
                                <th scope="col" className="text-start">{leave ? new Date(leave.startDate).toLocaleDateString() : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">تاريخ نهاية الاجازة</th>
                                <th scope="col" className="text-start">{leave ? new Date(leave.endDate).toLocaleDateString() : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">عدد أيام الاجازات</th>
                                <th scope="col" className="text-start">{leave ? leave.days : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">الملحوظات</th>
                                <th scope="col" className="text-start">{leave ? leave.notesFromEmployee : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">المرجع</th>
                                <th scope="col" className="text-start">#{leave ? leave.id : "جاري التحميل..."}</th>
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
                                                cancelButtonText: 'إلغاء'
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
                                                title: 'رفض الطلب',
                                                input: 'textarea',
                                                inputLabel: 'سبب الرفض',
                                                inputPlaceholder: 'اكتب سبب الرفض هنا...',
                                                inputAttributes: {
                                                    'aria-label': 'اكتب سبب الرفض هنا'
                                                },
                                                showCancelButton: true,
                                                confirmButtonText: 'رفض',
                                                cancelButtonText: 'إلغاء'
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
