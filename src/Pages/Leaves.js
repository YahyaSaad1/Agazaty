import '../CSS/Leaves.css';
import React, { useEffect, useState } from "react";
import { BASE_API_URL, token, userID } from "../server/serves";
import BtnLink from '../components/BtnLink';
import { Link } from 'react-router-dom';
import LoadingOrError from '../components/LoadingOrError';

function Leaves(){
    const [casualLeaveWating, setCasualLeaveWating] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/CasualLeave/GetAllWaitingCasualLeavesByGeneral_ManagerID/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message || 'حدث خطأ في جلب البيانات'); });
            }
            return res.json();
        })
        .then((data) => {
            setCasualLeaveWating(data);
        })
        .catch((error) => {
            console.error("Error fetching leave data:", error);
            setCasualLeaveWating([]);
        });
    }, [userID]);

    if (!casualLeaveWating || casualLeaveWating.length === 0) {
        return <LoadingOrError data={casualLeaveWating} />;
    }


    return(
        <div className="row">
            <div className="p-0">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات الإجازات</h2>
                </div>
            </div>
            {(Array.isArray(casualLeaveWating) && casualLeaveWating.length > 0) && (
                casualLeaveWating.map((leave, index) => (
                    <div className="mt-3" key={index}>
                        <div className="box mt-3 col-sm-12 col-md-10 col-lg-8">
                            <h3 className='mb-2'>إجازة {leave.leaveType} <span title='في انتظار الموافقة' className='text-primary'>مُعلقة</span></h3>
                            <h5>
                                طلب إجازة جديد من{" "}
                                <Link to={`/profile/user/${leave.userID}`} title='اضغط هنا لمشاهدة الملف الشخصي' className="text-primary text-decoration-none">{leave.userName}</Link> في انتظار اتخاذ قرار
                            </h5>
                            <p>
                                من يوم {new Date(leave.startDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })} إلى يوم{" "}
                                {new Date(leave.endDate).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </p>
                            <p>الملحوظات : {leave.notesFromEmployee || "بدون"}</p>

                            {/* <BtnLink id={leave.id} name="عرض الإجازة" link={`/manager-normal-leave-request`} className="btn btn-primary w-25"/> */}
                            <BtnLink id={leave.id} name="عرض الإجازة" link={`/manager-casual-leave-request`} className="btn btn-primary w-25"/>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Leaves;