import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import { BASE_API_URL, token } from '../server/serves';

function UserNormalLeaveRequest() {
    const {leaveID} = useParams();
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/GetNormalLeaveById/${leaveID}`, {
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
    }, [leaveID]);



    useEffect(() => {
        if (leave && leave.userID) {
            fetch(`${BASE_API_URL}/api/Account/GetUserById/${leave.userID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
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
                setUser(data);
            })
            .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [leave]);


    if (leave === null || user === null) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="position-relative" style={{ width: '4rem', height: '4rem' }}>
                    <div className="spinner-border text-primary w-100 h-100" role="status"></div>
                    <div className="position-absolute top-50 start-50 translate-middle text-primary fw-bold" style={{ fontSize: '0.75rem' }}>
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
                    <h2 className="m-0">{`اجازتي ال${leave.leaveType}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل الاجازات الاعتيادية' link='/agazaty/normal' class="btn btn-primary m-0 ms-2 mb-2"/>
                </div>
            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{backgroundColor:'#F5F9FF'}}>
                                    {leave ? (
                                        leave.holder === 0 ? <Btn name="القائم بالعمل" class="btn-danger text-start"/>
                                        : leave.holder === 1 ? <Btn name="المدير المباشر" class="btn-danger text-start"/>
                                        : leave.holder === 2 ? <Btn name="المدير المختص" class="btn-danger text-start"/>
                                        : leave.generalManager_Decision === true ? <Btn name="مقبولة" class="btn-success text-start"/>
                                        : leave.coWorker_Decision === false ? <Btn name="مرفوضة من القائم بالعمل" class="btn-danger text-start"/>
                                        : leave.directManager_Decision === false ? <Btn name="مرفوضة من المدير المباشر" class="btn-danger text-start"/>
                                        : leave.generalManager_Decision === false ? <Btn name="مرفوضة من المدير المختص" class="btn-danger text-start"/>
                                        : <Btn name="معلقة" class="btn-danger text-start"/>
                                    ) : "جاري التحميل..."}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">الاسم</th>
                                <th scope="col" className="text-start">{leave ? leave.userName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave ? leave.phoneNumber : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">{user ? user.departmentName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الاجازة</th>
                                <th scope="col" className="text-start">{leave.leaveType}</th>
                            </tr>
                            <tr>
                                <th scope="col">القائم بالعمل</th>
                                <th scope="col" className="text-start">{leave ? leave.coworkerName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">بداية الإجازة</th>
                                <th className="text-start">{leave?.startDate ? new Date(leave.startDate).toLocaleDateString('ar-EG') : "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">نهاية الإجازة</th>
                                <th className="text-start">{leave?.endDate ? new Date(leave.endDate).toLocaleDateString('ar-EG') : "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">عدد أيام الإجازة</th>
                                <th className="text-start">
                                    {leave?.days !== undefined 
                                        ? leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit]) 
                                        : "غير متوفر"}
                                </th>
                            </tr>

                            <tr>
                                <th scope="col">الملحوظات</th>
                                <th scope="col" className="text-start">{leave?.notesFromEmployee?.trim() ? leave.notesFromEmployee : "بدون"}</th>

                            </tr>
                            { (leave.disapproveReasonOfDirect_Manager !== null) ?
                                <tr>
                                    <th scope="col">ملوحظات الرفض</th>
                                    <th scope="col" className="text-start">{leave ? leave.disapproveReasonOfDirect_Manager: "جاري التحميل..."}</th>
                                </tr>
                                :(leave.disapproveReasonOfGeneral_Manager !== null) &&
                                <tr>
                                    <th scope="col">ملوحظات الرفض</th>
                                    <th scope="col" className="text-start">{leave ? leave.disapproveReasonOfGeneral_Manager : "جاري التحميل..."}</th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserNormalLeaveRequest;
