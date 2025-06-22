import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import Btn from '../components/Btn';
import { BASE_API_URL, token } from '../server/serves';
import LoadingOrError from '../components/LoadingOrError';
import OfficialLeaveReport from './CasualReport';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function UserNormalLeaveRequest() {
    const {leaveID} = useParams();
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);
    const MySwal = withReactContent(Swal);

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
        return <LoadingOrError data={leave} />;
    }

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`اجازتي ال${leave.leaveType}`}</h2>
                </div>
                <div className="p-3 pe-0">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                            MySwal.fire({
                            title: 'تقرير الإجازة',
                            html: <OfficialLeaveReport leaveID={leave.id} />,
                            showConfirmButton: false,
                            showCloseButton: true,
                            width: '95%',
                            customClass: {
                            popup: 'text-end custom-swal-width',
                            }})}>
                        <FontAwesomeIcon icon={faPrint} />
                        <span className="d-none d-sm-inline"> طباعة</span>
                    </button>
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
                                        leave.holder === 0 ? <Btn name="القائم بالعمل" className="btn-primary text-start text-bold"/>
                                        : leave.holder === 1 ? <Btn name="المدير المباشر" className="btn-primary text-start text-bold"/>
                                        : leave.holder === 2 ? <Btn name="المدير المختص" className="btn-primary text-start text-bold"/>
                                        : leave.generalManager_Decision === true ? <Btn name="مقبولة" className="btn-success text-start text-bold"/>
                                        : leave.coWorker_Decision === false ? <Btn name="مرفوضة من القائم بالعمل" className="btn-danger text-start text-bold"/>
                                        : leave.directManager_Decision === false ? <Btn name="مرفوضة من المدير المباشر" className="btn-danger text-start text-bold"/>
                                        : leave.generalManager_Decision === false ? <Btn name="مرفوضة من المدير المختص" className="btn-danger text-start text-bold"/>
                                        : <Btn name="مُعلقة" className="btn-primary text-start text-bold"/>
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
                                <th scope="col" className="text-start"> {user ? (user.departmentName ? (user.departmentName) : (<span className="text-danger">إدارة مستقلة</span>)) : ("جاري التحميل...")}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الإجازة</th>
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
