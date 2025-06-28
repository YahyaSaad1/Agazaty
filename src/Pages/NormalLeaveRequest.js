import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import { BASE_API_URL, token } from '../server/serves';
import LoadingOrError from '../components/LoadingOrError';
import OfficialLeaveReport from './CasualReport';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NormalLeaveRequest({handleError}) {
    const { leaveID } = useParams();
    const [leave, setLeave] = useState(null);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/GetNormalLeaveById/${leaveID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (res.status === 403 || res.status === 404) {
                handleError(res.status);
                return null;
            }
            return res.json();
        })
        .then((data) => {
            if (data) setLeave(data);
        })
        .catch((err) => console.error("Error fetching leave data:", err));
    }, [leaveID, handleError]);

    if (leave === null) {
        return <LoadingOrError data={leave} />;
    }

    if (!leave) {
        return <LoadingOrError data={leave} btnLink="/des-requests/normal" />;
    }

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0">{`إجازة ${leave.firstName} ${leave.secondName} الاعتيادية`}</h2>
                </div>
                <div className='d-flex'>
                    {leave.accepted === true && leave.holder === 3 && leave.leaveStatus === 1 &&
                    <div className="p-3 ps-2">
                        <BtnLink name='كسر الإجازة' leave={leave} id={leave.id} link='/update-normal-leave' className="btn btn-primary m-0 ms-2 mb-2"/>
                    </div>}
                    <div className="p-3 pe-0">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() =>
                                MySwal.fire({
                                title: 'تقرير الإجازة',
                                html: <OfficialLeaveReport leaveID={leaveID} />,
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
            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{backgroundColor:'#F5F9FF'}}>
                                    {leave.holder === 0 ? <Btn name="في انتظار القائم بالعمل" className="btn-primary text-start text-bold"/>
                                    : leave.holder === 1 ? <Btn name="في انتظار المدير المباشر" className="btn-primary text-start text-bold"/>
                                    : leave.holder === 2 ? <Btn name="في انتظار المدير المختص" className="btn-primary text-start text-bold"/>
                                    : leave.coWorker_Decision === false ? <Btn name="مرفوضة من القائم بالعمل" className="btn-danger text-start text-bold"/>
                                    : leave.directManager_Decision === false ? <Btn name="مرفوضة من المدير المباشر" className="btn-danger text-start text-bold"/>
                                    : leave.generalManager_Decision === false ? <Btn name="مرفوضة من المدير المختص" className="btn-danger text-start text-bold"/>
                                    : leave.accepted === true && leave.holder === 3 ? <Btn name="مقبولة" className="btn-success text-start"/>
                                    : <Btn name="مُعلقة" className="btn-primary text-start text-bold"/>}
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
                                <th scope="col" className="text-start">{leave.leaveType}</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">{leave ? leave.departmentName : <LoadingOrError data={leave} />}</th>
                            </tr>
                            <tr>
                                <th scope="col">القائم بالعمل</th>
                                <th scope="col" className="text-start">{leave.coworkerName}</th>
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
                                <th scope="col">الملحوظات</th><th scope="col" className="text-start">{leave.notesFromEmployee && leave.notesFromEmployee.trim() !== "" ? leave.notesFromEmployee : "بدون"}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default NormalLeaveRequest;
