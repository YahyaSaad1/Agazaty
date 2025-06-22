import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, token, userID } from "../server/serves";

function LeaveRecord() {
    const [leavesWating, setLeavesWating] = useState([]);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const urls = [
                    `${BASE_API_URL}/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`,
                    `${BASE_API_URL}/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`
                ];

                const requests = urls.map((url) => 
                    fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((res) => {
                        if (!res.ok) throw new Error("Network response was not ok");
                        return res.json();
                    })
                );

                const results = await Promise.allSettled(requests);

                const combinedData = results.reduce((acc, result) => {
                    if (result.status === "fulfilled" && Array.isArray(result.value)) {
                        acc = acc.concat(result.value);
                    }
                    return acc;
                }, []);

                setLeavesWating(combinedData);
            } catch (error) {
                console.error("Error fetching leave requests:", error);
                setLeavesWating([]);
            }
        };

        fetchLeaves();
    }, [userID, token]);


    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات الإجازات</h2>
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
                                        <td className={leave.leaveStatus === 0 ? "text-primary" : "text-success"}>
                                            {leave.leaveStatus === 0 ? "مُعلقة" : "مقبولة"}
                                        </td>
                                        <td>
                                            <BtnLink id={leave.id} name='عرض الإجازة' link='/general-manager/normal-leave-request' className="btn btn-outline-primary" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center text-danger p-3">لا يوجد طلبات اجازات</td>
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
