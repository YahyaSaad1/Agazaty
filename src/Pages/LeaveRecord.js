import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import Search from "../components/Search";
import API from "../Data" ;

function LeaveRecord() {
    const userID = localStorage.getItem("userID");
    const [leavesWating, setLeavesWating] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWating(Array.isArray(data) ? data : []))
            .catch((error) => {
                console.error("Error fetching leave requests:", error);
                setLeavesWating([]);
            });
    }, [userID]);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات الاجازات</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>المرجع</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>الاسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>القسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>رقم الهاتف</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>نوع الإجازة</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>تاريخ البداية</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>تاريخ النهاية</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>عدد الأيام</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>حالة الطلب</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leavesWating.length > 0 ? (
                                leavesWating.map((leave, index) => (
                                    <tr key={index}>
                                        <td>{leave.id}#</td>
                                        <td>{leave.userName}</td>
                                        <td>{leave.departmentName}</td>
                                        <td>{leave.phoneNumber}</td>
                                        <td>اعتيادية</td>
                                        <td>{leave.startDate ? new Date(leave.startDate).toLocaleDateString() : "-"}</td>
                                        <td>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : "-"}</td>
                                        <td>{leave.days} أيام</td>
                                        <td className={leave.leaveStatus === 0 ? "text-danger" : "text-success"}>
                                            {leave.leaveStatus === 0 ? "معلقة" : "مقبولة"}
                                        </td>
                                        <td>
                                            <BtnLink id={leave.id} name='عرض الإجازة' link='/direct-manager/normal-leave-request' class="btn btn-outline-primary" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center text-danger p-3">لا يوجد طلبات إجازات</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaveRecord;
