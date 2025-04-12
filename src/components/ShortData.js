import { useEffect, useState } from "react";
import '../CSS/LeaveBalance.css';

function ShortData() {
    const [department, setDepartments] = useState([]);
    const [acceptedLeaves, setAcceptedLeaves] = useState([]);
    const [rejectedLeaves, setRejectedLeaves] = useState([]);
    const [waitingLeaves, setWaitingLeaves] = useState([]);
    const [users, setUsers] = useState([]);
    const [leaves, setLeaves] = useState({});

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/Department/GetAllDepartments`)
            .then((res) => res.json())
            .then((data) => setDepartments(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetAllAcceptedNormalLeaves`)
            .then((res) => res.json())
            .then((data) => setAcceptedLeaves(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetAllRejectedNormalLeaves`)
            .then((res) => res.json())
            .then((data) => setRejectedLeaves(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetAllWaitingNormalLeaves`)
            .then((res) => res.json())
            .then((data) => setWaitingLeaves(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/Account/GetAllActiveUsers`)
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        setLeaves({
            numberLeave: {
                type: 'عدد الاجازات',
                num: ((acceptedLeaves?.length || 0) + (rejectedLeaves?.length || 0) + (waitingLeaves?.length || 0)),
            },
            departments: {
                type: 'الاقسام',
                num: department?.length || 0,
            },
            employees: {
                type: 'الموظفين',
                num: users?.length || 0,
            },
            acceptableLeave: {
                type: 'الاجازات المقبولة',
                num: acceptedLeaves?.length || 0,
            },
            rejectedLeaves: {
                type: 'الاجازات المرفوضة',
                num: rejectedLeaves?.length || 0,
            },
            pendingLeave: {
                type: 'الاجازات المعلقة',
                num: waitingLeaves?.length || 0,
            },
        });
    }, [department, acceptedLeaves, rejectedLeaves, waitingLeaves, users]);
    
    return (
        <div>
            <div className="mt-4">
                <h4>معلومات عامة</h4>
            </div>
            <div className="d-flex row gap-3 mt-3">
                {Object.values(leaves).map((leave, index) => (
                    <div className="box LeaveBalance col-md-5 col-lg-3 rounded-3 p-3" key={index}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>{leave.type}</h5>
                            <h4>{leave.num}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShortData;
