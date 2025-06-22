import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import { BASE_API_URL, token, useUserData } from '../server/serves';
import LoadingOrError from '../components/LoadingOrError';
import CasualReport from '../components/CasualReport';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function CasualLeaveRequestManger({handleError}) {
    const {leaveID} = useParams();
    const [leave, setLeave] = useState(null);
    const userData = useUserData();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/CasualLeave/GetCasualLeaveById/${leaveID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 403 || res.status === 404) {
                    handleError(res.status);
                    return null;
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setLeave(data);
                }
            })
            .catch((err) => console.error("Error fetching leave data:", err));
    }, [leaveID]);

    if (leave === null || !userData) {
        return <LoadingOrError data={leave} />;
    }

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`إجازة ${leave.firstName} ${leave.secondName} ال${leave.leaveType}`}</h2>
                </div>
                <div className="p-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                            MySwal.fire({
                            title: 'تقرير الإجازة',
                            html: <CasualReport leaveID={leave.id} />,
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
                                <th scope="col" className="text-start text-bold" style={{backgroundColor:'#F5F9FF'}}>
                                    {leave.leaveStatus === false ? <Btn name="مُعلقة عند المدير المباشر" className="btn-primary text-start text-bold"/>
                                    : <Btn name="مقبولة" className="btn-success text-start text-bold"/>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">اسم الموظف</th>
                                <th scope="col" className="text-start">{leave ? leave.userName : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الإجازة</th>
                                <th scope="col" className="text-start">{leave.leaveType}</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave ? leave.phoneNumber : "جاري التحميل..."}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">
                                    {userData 
                                        ? (userData.departmentName 
                                        ? userData.departmentName 
                                        : <span className='text-danger'>إدارة مستقلة</span>) 
                                        : "جاري التحميل..."}
                                </th>
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
                                <th scope="col" className="text-start">{leave.notes ? leave.notes : 'بدون'}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CasualLeaveRequestManger;
