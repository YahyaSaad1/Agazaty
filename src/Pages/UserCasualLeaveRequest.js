import { useParams } from 'react-router-dom';
import '../CSS/LeaveRequests.css';
import { useEffect, useState } from 'react';
import BtnLink from '../components/BtnLink';
import Btn from '../components/Btn';
import API from "../Data" ;

function UserCasualLeaveRequest() {
    const userID = localStorage.getItem("userID");
    const {leaveID} = useParams();
    const [leave, setLeave] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/CasualLeave/GetCasualLeaveById/${leaveID}`)
            .then((res) => res.json())
            .then((data) => {
                setLeave(data);
            })
            .catch((err) => console.error("Error fetching leave data:", err));
    }, [leaveID]);

    useEffect(() => {
            fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => console.error("Error fetching user data:", err));
    }, [userID]);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">{`الاجازة رقم #${leaveID}`}</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='سجل الاجازات العارضة' link='/agazaty/casual' class="btn btn-primary m-0 ms-2 mb-2"/>
                </div>
            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" className="text-start" style={{backgroundColor:'#F5F9FF'}}>
                                    {leave ? <Btn name="مقبولة" class="btn-success text-start"/>
                                    : "جاري التحميل..."}
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
                                <th scope="col" className="text-start">عارضة</th>
                            </tr>
                            <tr>
                                <th scope="col">رقم الهاتف</th>
                                <th scope="col" className="text-start">{user ? user.phoneNumber : "جاري التحميل..."}</th>
                            </tr>
                            {console.log(leave)}
                            <tr>
                                <th scope="col">القسم</th>
                                <th scope="col" className="text-start">{user ? user.departmentName : "جاري التحميل..."}</th>
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
                                <th scope="col" className="text-start">{leave.notes ? leave.notes : 'بدون'}</th>
                            </tr>
                            <tr>
                                <th scope="col">المرجع</th>
                                <th scope="col" className="text-start">#{leave ? leave.id : "جاري التحميل..."}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserCasualLeaveRequest;

