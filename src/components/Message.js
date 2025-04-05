import React, { useEffect, useState } from "react";
import API from "../Data" ;

function Message() {
    const userID = localStorage.getItem("userID");
    const [leaveWating, setLeaveWating] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByCoWorkerID/${userID}`)
            .then((res) => res.json())
            .then((data) => {setLeaveWating(data)})
    }, []);

    const updateDecision = (leaveID, CoworkerDecision) => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/UpdateCoworkerDecision/${leaveID}?CoworkerDecision=${CoworkerDecision}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update decision");
                }
                return res.json();
            })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => console.error("Error updating decision:", err));
    };

    return (
        <div className="row">
            <div className="p-0">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">القائم بالعمل</h2>
                </div>
            </div>
            {Array.isArray(leaveWating) && leaveWating.length > 0 ? (
                leaveWating.map((leave, index) => (
                    <div className="mt-3" key={index}>
                        <div className="box mt-3 col-sm-12 col-md-10 col-lg-8">
                            <h5>طلب اجازة جديد من <span className="text-primary">{leave.userName}</span> في انتظار موافقتك</h5>
                            <p>من يوم {new Date(leave.startDate).toLocaleDateString()} إلى يوم {new Date(leave.endDate).toLocaleDateString()}</p>
                            <p>ملحوظات الزميل : {leave.notesFromEmployee}</p>

                            <button className="btn btn-primary m-2 w-25" onClick={() => updateDecision(leave.id, true)}>موافقة</button>
                            <button className="btn btn-danger" onClick={() => updateDecision(leave.id, false)}>رفض</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-danger mt-4">لا توجد طلبات اجازة في الوقت الحالي.</p> // ✅ رسالة بديلة عند عدم وجود بيانات
            )}
        </div>
    );
}

export default Message;
