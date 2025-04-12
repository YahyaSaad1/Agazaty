import { Link, useLocation } from "react-router-dom";
import '../CSS/LinkSideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import API from "../Data" ;

function LinkSideBar(props) {
    const userID = localStorage.getItem("userID");
    const { items } = props;
    const location = useLocation();
    const filteredItems = items.filter(item => item.status === true);

    const [leavesWating, setLeavesWating] = useState([]);
    const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
    const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
    const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
    const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByCoWorkerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWating(data))
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => {setLeavesWatingForDirect(data)})
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => {setLeavesWatingForGeneral(data)})
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingSickLeaves`)
            .then((res) => res.json())
            .then((data) => {setWaitingSickLeaves(data)})
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingCertifiedSickLeaves`)
            .then((res) => res.json())
            .then((data) => {setWaitingCertifiedSickLeaves(data)})
    }, []);

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