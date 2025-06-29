import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import Btn from '../components/Btn';
import { BASE_API_URL, token } from '../server/serves';
import LoadingOrError from './LoadingOrError';
import SickReport from './SickReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function SickLeaveRequest() {
    const {leaveID} = useParams();
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const fetchSickLeaveById = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetSickLeaveById/${leaveID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setLeave(data);

                if (data && data.userID) {
                    const userResponse = await fetch(`${BASE_API_URL}/api/Account/GetUserById/${data.userID}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    const userData = await userResponse.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSickLeaveById();
    }, [leaveID]);


    if (leave === null || user === null) {
        return <LoadingOrError data={leave} />;
    }

console.log(leave)
    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0">{`إجازة ${leave.firstName} ${leave.secondName} ال${leave.leaveType}`}</h2>
                </div>
                <div className="p-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                            MySwal.fire({
                            title: 'تقرير الإجازة',
                            html: <SickReport leaveID={leave.id} />,
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
                                <th scope="col" className="pb-3" style={{ backgroundColor: '#F5F9FF' }}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{ backgroundColor: '#F5F9FF' }}>
                                    {leave?.certified === true
                                        ? <Btn name="مُستحقة" className="btn-success text-bold"/>
                                        : (leave?.responseDoneFinal === false && leave?.respononseDoneForMedicalCommitte === false)
                                        ? <Btn name="مُعلقة عند التحديث الأول" className="btn-primary text-bold"/>
                                        : (leave?.responseDoneFinal === false && leave?.respononseDoneForMedicalCommitte === true)
                                        ? <Btn name="مُعلقة عند التحديث الثاني" className="btn-primary text-bold"/>
                                        : <Btn name="غير مُستحقة" className="btn-danger text-bold"/>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">الاسم</th>
                                <th scope="col" className="text-start">{leave?.userName || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">نوع الإجازة</th>
                                <th scope="col" className="text-start">{leave.leaveType || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">ملاحظات المرض</th>
                                <th scope="col" className="text-start">{leave?.disease || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">
                                    {user
                                        ? (user.departmentName
                                            ? user.departmentName
                                            : <span className='text-danger'>إدارة مستقلة</span>)
                                        : "غير متوفر"}
                                </th>
                            </tr>

                            {leave?.certified && (
                                <>
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
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SickLeaveRequest;
