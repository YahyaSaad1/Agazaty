import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import { BASE_API_URL, token } from '../server/serves';

function UserSickLeaveRequest() {
    const {leaveID} = useParams();
    const [leave, setLeave] = useState(null);
    const [user, setUser] = useState(null); 

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

    // حالة التحميل
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

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`اجازتي ال${leave.leaveType}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل الاجازات المرضية' link='/agazaty/sick' class="btn btn-primary m-0 ms-2 mb-2" />
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
                                        ? <Btn name="مقبولة" class="btn-success"/>
                                        : (leave?.responseDoneFinal === false && leave?.respononseDoneForMedicalCommitte === false)
                                            ? <th className="text-primary">معلقة عند التحديث الأول</th>
                                            : (leave?.responseDoneFinal === false && leave?.respononseDoneForMedicalCommitte === true)
                                            ? <Btn name="معلقة عند التحديث الثاني" class="btn-primary"/>
                                            : <Btn name="مرفوضة" class="btn-danger"/>
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
                                <th scope="col">نوع الاجازة</th>
                                <th scope="col" className="text-start">{leave.leaveType || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">ملاحظات المرض</th>
                                <th scope="col" className="text-start">{leave?.disease || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{leave?.phoneNumber || "غير متوفر"}</th>
                            </tr>
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">
                                    {user
                                        ? (user.departmentName
                                            ? user.departmentName
                                            : <span className='text-danger'>لم يُحدد بعد</span>)
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

export default UserSickLeaveRequest;
