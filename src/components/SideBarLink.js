import { Link, useLocation } from "react-router-dom";
import '../CSS/LinkSideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BASE_API_URL, token, userID } from "../server/serves";

function LinkSideBar(props) {
    const { items } = props;
    const location = useLocation();
    const filteredItems = items.filter(item => item.status === true);

    const [leavesWating, setLeavesWating] = useState([]);
    const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
    const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
    const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
    const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByCoWorkerID/${userID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setLeavesWating(data))
            .catch((err) => console.error("Error fetching co-worker leaves:", err));
        }, [userID]);

        useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setLeavesWatingForDirect(data))
            .catch((err) => console.error("Error fetching direct manager leaves:", err));
        }, [userID]);

        useEffect(() => {
        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setLeavesWatingForGeneral(data))
            .catch((err) => console.error("Error fetching general manager leaves:", err));
        }, [userID]); // عدلت التبعيات لتشمل userID


    useEffect(() => {
        const fetchWaitingSickLeaves = async () => {
            try {
            const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingSickLeaves`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // إضافة التوكن هنا
                },
            });

            const data = await response.json();
            setWaitingSickLeaves(data);
            } catch (error) {
            console.error("Error fetching waiting sick leaves:", error);
            }
        };

        fetchWaitingSickLeaves();
        }, [token]);  // أضفنا التوكن كاعتماد داخل الـ useEffect


    useEffect(() => {
        const fetchWaitingCertifiedSickLeaves = async () => {
            try {
            const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingCertifiedSickLeaves`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // إضافة التوكن هنا
                },
            });

            const data = await response.json();
            setWaitingCertifiedSickLeaves(data);
            } catch (error) {
            console.error("Error fetching waiting certified sick leaves:", error);
            }
        };

        fetchWaitingCertifiedSickLeaves();
        }, [token]);  // أضفنا التوكن كاعتماد داخل الـ useEffect


    return (
        <>
            {filteredItems.map((item, index) => {
                const isActive = location.pathname === item.link; 
                return (
                    <Link to={item.link} className={`link-SideBar ${item.class}`} key={index}>
                        <li className={`link-SideBar ${item.class} ${isActive ? 'active-link' : ''} tran`}>
                            <FontAwesomeIcon icon={item.icon} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                            <span className="col-xl-8 d-none d-xxl-block">{item.title}</span>
                            {item.UserHint && leavesWating.length > 0 ? (
                                <span className="d-none d-xxl-flex justify-content-center align-items-center text-light rounded-2 bg-danger hintSideBar" style={{ fontSize: '12px' }}>
                                    {leavesWating.length}
                                </span> 
                            ) : item.ManagerHint && leavesWatingForDirect.length > 0 ? (
                                <span className="d-none d-xl-flex justify-content-center align-items-center text-light rounded-2 bg-danger hintSideBar" style={{ fontSize: '12px' }}>
                                    {leavesWatingForDirect.length}
                                </span> 
                            ) : item.ManagerHint && leavesWatingForGeneral.length > 0 ? (
                                <span className="d-none d-xl-flex justify-content-center align-items-center text-light rounded-2 bg-danger hintSideBar" style={{ fontSize: '12px' }}>
                                    {leavesWatingForGeneral.length}
                                </span> 
                            ) : (item.HRHint && waitingSickLeaves.length > 0) || (item.HRHint && waitingCertifiedSickLeaves.length > 0) ? (
                                <span className="d-none d-xl-flex justify-content-center align-items-center text-light rounded-2 bg-danger hintSideBar" style={{ fontSize: '12px' }}>
                                    {waitingSickLeaves.length + waitingCertifiedSickLeaves.length}
                                </span> 
                            ) : null
                            }
                        </li>
                    </Link>
                );
            })}
        </>
    );
}

export default LinkSideBar;