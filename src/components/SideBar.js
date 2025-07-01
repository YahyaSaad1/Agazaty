import '../CSS/SideBar.css';
import { faHouse, faUser, faCalendarPlus, faHandshake, faUsersRectangle, faUsers, faFolderOpen, faCalendarDays, faCircleQuestion, faScroll, faCircleExclamation, faCircleH, faHouseMedicalCircleCheck, faRightFromBracket, faCalendarDay, faChevronUp, faChevronDown, faUserPlus, faPersonArrowUpFromLine, faNewspaper, faTowerBroadcast, faDisease, faBacteria, faUsersSlash, faArrowsTurnToDots, faFolderClosed, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Menu } from "./MenuContext";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BASE_API_URL, roleName, token, userID, useUserData } from '../server/serves';

function SideBar(){
    const sidebarRef = useRef(null);
    const userData = useUserData();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(null);
    const [leavesWating, setLeavesWating] = useState([]);
    const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
    const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
    const [casualLeavesWatingForGeneral, setCasualLeavesWatingForGeneral] = useState([]);
    const [sickLeavesWatingForGeneral, setSickLeavesWatingForGeneral] = useState([]);
    const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
    const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState([]);
    const toggleMenu = (name) => {
        setActiveMenu((prev) => (prev === name ? null : name))
    };
    const menu = useContext(Menu)
    const isOpen = menu.isOpen;
    const setIsOpen = menu.setIsOpen;

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
        .catch((err) => console.error("Error fetching waiting leaves by co-worker:", err));

        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setLeavesWatingForDirect(data))
        .catch((err) => console.error("Error fetching waiting leaves by direct manager:", err));

        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setLeavesWatingForGeneral(data))
        .catch((err) => console.error("Error fetching waiting leaves by general manager:", err));


        fetch(`${BASE_API_URL}/api/CasualLeave/GetAllWaitingCasualLeavesByGeneral_ManagerID/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setCasualLeavesWatingForGeneral(data))
        .catch((err) => console.error("Error fetching waiting leaves by general manager:", err));


        fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingSickLeavesForGeneralManager/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setSickLeavesWatingForGeneral(data))
        .catch((err) => console.error("Error fetching waiting leaves by general manager:", err));



        fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingSickLeavesForHR`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setWaitingSickLeaves(data))
        .catch((error) => console.error("Error fetching waiting sick leaves:", error));

        fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingCertifiedSickLeaves`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setWaitingCertifiedSickLeaves(data))
        .catch((error) => console.error("Error fetching waiting certified sick leaves:", error));

    }, [userID]);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            isOpen &&
            window.innerWidth < 700 &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    return(
        <div ref={sidebarRef} className={`side-bar pt-4 ${isOpen ? 'open' : 'closed'}`}>
            <NavLink className={`${isOpen?"d-flex m-2 mt-0 p-3 pt-0 justify-content-between align-items-center text-decoration-none": "d-flex justify-content-center align-items-center"}`}>
                <Link to={`${isOpen? '/agazaty' : ''}`} className='fs-2 fw-bold text-decoration-none' style={{display: isOpen? "block": "none"}}>اجازاتي</Link>
                <FontAwesomeIcon className={`${isOpen? "": "m-2 mt-0 p-3 pt-0"}`} icon={faArrowsTurnToDots} cursor={'pointer'}  onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsOpen(prev => !prev)}} style={{fontSize: '2em'}} />
            </NavLink>

            <NavLink onClick={() => toggleMenu("/")} to={"/"} className={`${activeMenu === "/" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faHouse} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الرئيسية</span></p>
            </NavLink>

            <NavLink onClick={() => toggleMenu("profile")} to={"/profile"} className={`${activeMenu === "profile" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faUser} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الملف الشخصي</span></p>
            </NavLink>

            <NavLink onClick={() => toggleMenu("coworker")} to={"/coworker"} className={`position-relative ${activeMenu === "coworker" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                {leavesWating.length > 0 &&
                <span className="bg-danger text-white rounded-circle position-absolute" style={{ top: '5px', right: '5px', fontSize: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {leavesWating.length}
                </span>}
                <FontAwesomeIcon icon={faHandshake} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>طلبات القيام بالعمل</span></p>
            </NavLink>

            {roleName !== "عميد الكلية" &&<>
                <NavLink className={`zxc ${activeMenu === "request" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("request")}>
                    <div className="d-flex">
                        <FontAwesomeIcon icon={faCalendarPlus} style={{fontSize: '1.6em'}} />
                            {isOpen && <span className="me-2 sidebar-title">طلب إجازة</span>}
                        </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "request" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>
                <div className={`collapse ${activeMenu === "request" ? "show" : ""}`}>
                    <NavLink to="/request/normal-leave" className={`${location.pathname === "/request/normal-leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>اعتيادية</p>
                    </NavLink>
                    <NavLink to="/request/casual-leave" className={`${location.pathname === "/request/casual-leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>عارضة</p>
                    </NavLink>
                    <NavLink to="/request/sick-leave" className={`${location.pathname === "/request/sick-leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faDisease} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p>
                    </NavLink>
                </div>


                <NavLink className={`zxc ${activeMenu === "agazaty2" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("agazaty2")}>
                    <div className="d-flex">
                        <FontAwesomeIcon icon={faCalendarDays} style={{fontSize: "1.6em"}} />
                            {isOpen && <span className="me-2 sidebar-title">إجازاتي</span>}
                        </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "agazaty2" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>
                <div className={`collapse ${activeMenu === "agazaty2" ? "show" : ""}`}>
                    <NavLink to="/agazaty2/normal" className={`${location.pathname === "/agazaty2/normal" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>اعتيادية</p>
                    </NavLink>
                    <NavLink to="/agazaty2/casual" className={`${location.pathname === "/agazaty2/casual" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>عارضة</p>
                    </NavLink>
                    <NavLink to="/agazaty2/sick" className={`${location.pathname === "/agazaty2/sick" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faBacteria} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p>
                    </NavLink>
                    <NavLink to="/agazaty2/permit" className={`${location.pathname === "/agazaty2/permit" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faScroll} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>تصاريح</p>
                    </NavLink>
                </div>
            </>}

            {['عميد الكلية', 'مدير الموارد البشرية'].includes(roleName) &&<>
                <NavLink onClick={() => toggleMenu("departments")} to={"/departments"} className={`${activeMenu === "departments" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                    <FontAwesomeIcon icon={faUsersRectangle} style={{fontSize: '1.6em'}} />
                    <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الأقسام</span></p>
                </NavLink>
            </>}

            {['مدير الموارد البشرية'].includes(roleName) &&<>
                <NavLink onClick={() => toggleMenu("holidays")} to={"/holidays"} className={`${activeMenu === "holidays" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                    <FontAwesomeIcon icon={faCalendarDay} style={{fontSize: '1.6em'}} />
                    <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الإجازات الرسمية</span></p>
                </NavLink>
            </>}

            {['عميد الكلية', 'مدير الموارد البشرية'].includes(roleName) &&<>
                <NavLink className={`zxc ${activeMenu === "employees" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("employees")}>
                    <div className="d-flex">
                        <FontAwesomeIcon icon={faUsersViewfinder} style={{fontSize: "1.6em"}} />
                            {isOpen && <span className="me-2 sidebar-title">الموظفين</span>}
                        </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "employees" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>
                <div className={`collapse ${activeMenu === "employees" ? "show" : ""}`}>
                    <NavLink to="/employees/active" className={`${location.pathname === "/employees/active" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faUsers} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>الموظفين النشطين</p></NavLink>
                    <NavLink to="/employees/nonactive" className={`${location.pathname === "/employees/nonactive" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faUsersSlash} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>الموظفين الغير نشطين</p></NavLink>
                    {['مدير الموارد البشرية'].includes(roleName) &&<>
                        <NavLink to="/employees/add-employee" className={`${location.pathname === "/employees/add-employee" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faUserPlus} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>إضافة موظف</p></NavLink>
                        <NavLink to="/employees/UploadUsersExcel" className={`${location.pathname === "/ploadUsersExcel" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faPersonArrowUpFromLine} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>رفع موظف</p></NavLink>
                    </>}
                </div>
            </>}

            {(roleName !== 'مدير الموارد البشرية' && userData.isDirectManager) &&<>
                <NavLink onClick={() => toggleMenu("recordNormal")} to={"/record/normal/leave"} className={`${activeMenu === "recordNormal" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                    {leavesWatingForDirect.length > 0 &&
                        <span className="sidebar-hint bg-danger text-white rounded-circle position-absolute">
                            {leavesWatingForDirect.length}
                        </span>}
                    <FontAwesomeIcon icon={faFolderOpen} style={{fontSize: '1.6em'}} />
                    <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>طلبات الإجازات</span></p>
                </NavLink>
            </>}


            {/* {(['عميد الكلية', 'أمين الكلية', 'مدير الموارد البشرية'].includes(roleName) || ! userData.isDirectManager) &&<>
                <NavLink className={`zxc ${activeMenu === "record" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("record")}>
                    <div className="d-flex">
                        <FontAwesomeIcon icon={faFolderOpen} style={{fontSize: "1.6em"}} />
                            {isOpen && <span className="me-2 sidebar-title">طلبات الإجازات</span>}
                        </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "record" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>
                <div className={`collapse ${activeMenu === "record" ? "show" : ""}`}>
                    <NavLink to="/record/normal/leave" className={`${location.pathname === "/record/normal/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faNewspaper} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>اعتيادية</p></NavLink>
                    {['عميد الكلية', 'أمين الكلية'].includes(roleName) ?<>
                        <NavLink to="/record/casual/leave" className={`${location.pathname === "/record/casual/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>عارضة</p></NavLink>
                        <NavLink to="/record/sick/leave" className={`${location.pathname === "/record/sick/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faHouseMedicalCircleCheck} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p></NavLink>
                    </> :['مدير الموارد البشرية'].includes(roleName) && <>
                        <NavLink to="/record/sick-leaves" className={`${location.pathname === "/record/sick-leaves" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}><FontAwesomeIcon icon={faHouseMedicalCircleCheck} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p></NavLink>
                    </>}
                </div>
            </>} */}


            {((['عميد الكلية', 'أمين الكلية'].includes(roleName) && !userData.isDirectManager) || (roleName === 'مدير الموارد البشرية')) &&<>
                <NavLink className={`zxc ${activeMenu === "record" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("record")}>
                    <div className="d-flex position-relative">
                        {['عميد الكلية', 'أمين الكلية'].includes(roleName) && (leavesWatingForGeneral.length > 0 || casualLeavesWatingForGeneral.length > 0 || sickLeavesWatingForGeneral.length > 0) &&
                        <span className="sidebar-hint bg-danger text-white rounded-circle position-absolute">
                            {leavesWatingForGeneral.length + casualLeavesWatingForGeneral.length + sickLeavesWatingForGeneral.length}
                        </span>}

                        {['مدير الموارد البشرية'].includes(roleName) && ((() => {const totalWaiting =(leavesWatingForDirect?.length ?? 0) +(waitingSickLeaves?.length ?? 0) +(waitingCertifiedSickLeaves?.length ?? 0);
                            return totalWaiting > 0 && (
                            <span className="sidebar-hint bg-danger text-white rounded-circle position-absolute">{totalWaiting}</span>
                            );
                        })()
                        )}

                        <FontAwesomeIcon icon={faFolderOpen} style={{fontSize: "1.6em"}} />
                        {isOpen && <span className="me-2 sidebar-title">طلبات الإجازات</span>}
                    </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "record" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>

                <div className={`collapse ${activeMenu === "record" ? "show" : ""}`}>
                    <NavLink to="/record/normal/leave" className={`position-relative ${location.pathname === "/record/normal/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        {(leavesWatingForGeneral.length > 0 || leavesWatingForDirect.length > 0) &&
                            <span className="sidebar-hint-list bg-danger text-white rounded-circle position-absolute">
                                {leavesWatingForGeneral.length || leavesWatingForDirect.length}
                            </span>}
                        <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>اعتيادية</p>
                    </NavLink>
                    {['عميد الكلية', 'أمين الكلية'].includes(roleName) ?<>
                        <NavLink to="/record/casual/leave" className={`position-relative ${location.pathname === "/record/casual/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                            {casualLeavesWatingForGeneral.length > 0 &&
                                <span className="sidebar-hint-list bg-danger text-white rounded-circle position-absolute">
                                    {casualLeavesWatingForGeneral.length}
                                </span>}
                            <FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>عارضة</p>
                        </NavLink>
                        <NavLink to="/record/sick/leave" className={`position-relative ${location.pathname === "/record/sick/leave" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                            {sickLeavesWatingForGeneral.length > 0 &&
                                <span className="sidebar-hint-list bg-danger text-white rounded-circle position-absolute">
                                    {sickLeavesWatingForGeneral.length}
                                </span>}
                            <FontAwesomeIcon icon={faHouseMedicalCircleCheck} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p>
                        </NavLink>
                    </> : <>
                        <NavLink to="/record/sick-leaves" className={`position-relative ${location.pathname === "/record/sick-leaves" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                            {(waitingSickLeaves.length > 0 || waitingCertifiedSickLeaves.length > 0) &&
                                <span className="sidebar-hint-list bg-danger text-white rounded-circle position-absolute">
                                    {waitingSickLeaves.length + waitingCertifiedSickLeaves.length}
                                </span>}
                            <FontAwesomeIcon icon={faHouseMedicalCircleCheck} style={{ fontSize: "1em" }} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p>
                        </NavLink>
                    </>}
                </div>
            </>}


            {['عميد الكلية', 'مدير الموارد البشرية'].includes(roleName) &&<>
                <NavLink className={`zxc ${activeMenu === "des-requests" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`} onClick={() => toggleMenu("des-requests")}>
                    <div className="d-flex">
                        <FontAwesomeIcon icon={faFolderClosed} style={{fontSize: "1.6em"}} />
                            {isOpen && <span className="me-2 sidebar-title">سجل الإجازات</span>}
                        </div>
                    <div>{isOpen && ( <FontAwesomeIcon icon={activeMenu === "des-requests" ? faChevronUp : faChevronDown} className="ms-auto" /> )}</div>
                </NavLink>
                <div className={`collapse ${activeMenu === "des-requests" ? "show" : ""}`}>
                    <NavLink to="/des-requests/normal" className={`${location.pathname === "/des-requests/normal" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faNewspaper} style={{fontSize: "1em"}} /><p className='m-0' style={{display: isOpen? "block": "none"}}>اعتيادية</p>
                    </NavLink>
                    <NavLink to="/des-requests/casual" className={`${location.pathname === "/des-requests/casual" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faTowerBroadcast} style={{fontSize: "1em"}} /><p className='m-0' style={{display: isOpen? "block": "none"}}>عارضة</p>
                    </NavLink>
                    <NavLink to="/des-requests/sick" className={`${location.pathname === "/des-requests/sick" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faCircleH} style={{fontSize: "1em"}} /><p className='m-0' style={{display: isOpen? "block": "none"}}>مرضية</p>
                    </NavLink>
                    <NavLink to="/des-requests/permit" className={`${location.pathname === "/des-requests/permit" ? 'active-link' : ''} ${isOpen?"sidebar-list": "sidebar-list-close"}`}>
                        <FontAwesomeIcon icon={faScroll} style={{fontSize: "1em"}} /><p className='m-0' style={{display: isOpen? "block": "none"}}>تصاريح</p>
                    </NavLink>
                </div>
            </>}

            {['مدير الموارد البشرية'].includes(roleName) &&<>
                <NavLink onClick={() => toggleMenu("permit")} to={"/permit"} className={`${activeMenu === "permit" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                    <FontAwesomeIcon icon={faScroll} style={{fontSize: '1.6em'}} />
                    <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>إضافة تصريح</span></p>
                </NavLink>
            </>}

            <NavLink onClick={() => toggleMenu("inquiries")} to={"/inquiries"} className={`${activeMenu === "inquiries" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faCircleQuestion} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الاستفسارات</span></p>
            </NavLink>

            <NavLink onClick={() => toggleMenu("agazaty")} to={"/agazaty"} className={`${activeMenu === "agazaty" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>معلومات عامة</span></p>
            </NavLink>

            {/* <NavLink onClick={() => toggleMenu("sitting")} to={"/sitting"} className={`${activeMenu === "sitting" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faGear} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الإعدادات</span></p>
            </NavLink> */}

            <NavLink onClick={handleLogout} to={"/login"} className={`logout ${activeMenu === "login" ? 'active-link' : ''} ${isOpen?"sidebar-link": "sidebar-link-close"}`}>
                <FontAwesomeIcon icon={faRightFromBracket} style={{fontSize: '1.6em'}} />
                <p style={{display: isOpen? "block": "none"}}><span className='me-2 sidebar-title'>الخروج</span></p>
            </NavLink>

        </div>
    )
}

export default SideBar;
