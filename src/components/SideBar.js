import { Link, useLocation, useNavigate } from "react-router-dom";
import '../CSS/SideBar.css';
import '../CSS/LinkSideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faCalendarPlus, faHandshake, faUsersRectangle, faUsers, faFolderOpen, faCalendarDays, faCircleQuestion, faGear, faScroll, faCircleExclamation, faCircleH, faHouseMedicalCircleCheck, faRightFromBracket, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { BASE_API_URL, roleName, token, userID, useUserData } from "../server/serves";

function SideBar() {
    const location = useLocation();

    const [openDropdown, setOpenDropdown] = useState(null);
    const [leavesWating, setLeavesWating] = useState([]);
    const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
    const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
    const [casualLeavesWatingForGeneral, setCasualLeavesWatingForGeneral] = useState([]);
    const [sickLeavesWatingForGeneral, setSickLeavesWatingForGeneral] = useState([]);
    const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
    const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState([]);
    const sidebarRef = useRef();
    const userData = useUserData();

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
            Authorization: `Bearer ${token}`, // إضافة التوكن هنا
        },
        })
        .then((res) => res.json())
        .then((data) => setWaitingSickLeaves(data))
        .catch((error) => console.error("Error fetching waiting sick leaves:", error));

        fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingCertifiedSickLeaves`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // إضافة التوكن هنا
        },
        })
        .then((res) => res.json())
        .then((data) => setWaitingCertifiedSickLeaves(data))
        .catch((error) => console.error("Error fetching waiting certified sick leaves:", error));

    }, [userID]);

    const toggleDropdown = (name) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setOpenDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderLink = (title, icon, link, roles, extraClass = "", hasBadge = false, badgeCount = 0) => {
        const rolesArray = roles.split(',').map(role => role.trim());
        if (!rolesArray.includes(roleName)) return null;

        return (
            <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
                <li className={`link-SideBar ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran position-relative`}>
                    <FontAwesomeIcon icon={icon} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                    <span className="col-xl-8 d-none d-xxl-block">{title}</span>
                    <span className="tooltip-text d-block d-xxl-none">{title}</span>
                    {hasBadge && badgeCount > 0 && (
                        <span className="badge bg-danger text-white rounded-circle position-absolute" style={{ top: '5px', right: '5px', fontSize: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {badgeCount}
                        </span>
                    )}
                </li>
            </Link>
        );
    };

    const renderSubLink = (title, link, roles, extraClass = "") => {
    const rolesArray = roles.split(',').map(role => role.trim());
    if (!rolesArray.includes(roleName)) return null;

    const isActive = location.pathname === link;

    return (
        <Link to={link} className={`link-SideBar2 ${extraClass} tran`} key={link}>
            <li className={`d-none d-xxl-block ${isActive ? 'active-link' : ''}`}>
                {title}
            </li>
        </Link>
    );
};


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="pt-3 SideBar" ref={sidebarRef}>
            <div>
                <Link to={'/agazaty'} className="Agazaty d-flex text-center text-primary" title="معلومات عن النظام">اجازاتي</Link>
            </div>
            <div>
                <ul className="list-unstyled p-0 pt-2">
                    {renderLink('الرئيسية', faHouse, '/', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {renderLink('الملف الشخصي', faUser, '/profile', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}

                    {roleName !== 'عميد الكلية' &&
                        <div className="link-SideBar4">
                            <li onClick={() => toggleDropdown('leave')} className={`link-SideBar44 ${location.pathname.startsWith('/normal-leave') || location.pathname.startsWith('/casual-leave') || location.pathname.startsWith('/sick-leave') ? 'active-link' : ''}`} >                                <FontAwesomeIcon icon={faCalendarPlus} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">طلب إجازة</span>
                                <span className="tooltip-text d-block d-xxl-none">طلب إجازة</span>
                            </li>
                            {openDropdown === 'leave' && (
                                <ul className="list-unstyled pl-4 d-none d-xxl-block">
                                    {renderSubLink('اعتيادية', '/normal-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                    {renderSubLink('عارضة', '/casual-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                    {renderSubLink('مرضية', '/sick-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                </ul>
                            )}
                        </div>
                    }

                    {renderLink('طلبات القيام بالعمل', faHandshake, '/messages', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف', '', true, leavesWating.length)}
                    {/* {renderLink('طلبات الإجازات', faHandshake, '/leaves', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف', '', true, leavesWating.length)} */}

                    {roleName !== 'عميد الكلية' &&
    <div className="link-SideBar4">
        <li
            onClick={() => toggleDropdown('myLeaves')}
            className={`link-SideBar44 ${location.pathname.startsWith('/agazaty') ? 'active-link' : ''}`}
        >
            <FontAwesomeIcon icon={faCalendarDays} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
            <span className="col-xl-8 d-none d-xxl-block">اجازاتي</span>
            <span className="tooltip-text d-block d-xxl-none">اجازاتي</span>
        </li>
        {openDropdown === 'myLeaves' && (
            <ul className="list-unstyled pl-4 d-none d-xxl-block">
                {renderSubLink('اعتيادية', '/agazaty/normal', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                {renderSubLink('عارضة', '/agazaty/casual', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                {renderSubLink('مرضية', '/agazaty/sick', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                {renderSubLink('تصاريح', '/agazaty/permit', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
            </ul>
        )}
    </div>
}



                    {renderLink('الأقسام', faUsersRectangle, '/departments', 'عميد الكلية, مدير الموارد البشرية')}
                    {renderLink('الإجازات الرسمية', faCalendarDay, '/holidays', 'مدير الموارد البشرية')}

                    {(roleName === "عميد الكلية" || roleName === "مدير الموارد البشرية") &&
                        <div className="link-SideBar4">
                            <li
                                onClick={() => toggleDropdown('employees')}
                                className={`link-SideBar44 ${location.pathname.startsWith('/employees') || location.pathname === '/UploadUsersExcel' ? 'active-link' : ''}`}
                            >
                                <FontAwesomeIcon icon={faUsers} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">الموظفين</span>
                                <span className="tooltip-text d-block d-xxl-none">الموظفين</span>
                            </li>
                            {openDropdown === 'employees' && (
                                <ul className="list-unstyled pl-4 d-none d-xxl-block">
                                {renderSubLink('الموظفين النشطين', '/employees/active', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية')}
                                {renderSubLink('الموظفين غير النشطين', '/employees/nonactive', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية')}
                                {renderSubLink('رفع موظف', '/UploadUsersExcel', 'مدير الموارد البشرية')}
                                </ul>
                            )}
                        </div>

                    }

                    {(roleName === "عميد الكلية" || roleName === "مدير الموارد البشرية") &&
                        <div className="link-SideBar4">
                            <li
                            
                                onClick={() => toggleDropdown('leavesRecord')}
                                className={`link-SideBar44 ${location.pathname.startsWith('/des-requests') ? 'active-link' : ''}`}
                            >
                                <FontAwesomeIcon icon={faFolderOpen} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block" >سجل الإجازات</span>
                                <span className="tooltip-text d-block d-xxl-none" >سجل الإجازات</span>
                            </li>
                            {openDropdown === 'leavesRecord' && (
                                <ul className="list-unstyled pl-4 d-none d-xxl-block">
                                {renderSubLink('اعتيادية', '/des-requests/normal', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                                {renderSubLink('عارضة', '/des-requests/casual', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                                {renderSubLink('مرضية', '/des-requests/sick', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                                {renderSubLink('تصاريح', '/des-requests/permit', 'مدير الموارد البشرية')}
                                </ul>
                            )}
                        </div>
                    }


                    {userData.isDirectManager && renderLink('طلبات الإجازات', faFolderOpen, '/leave-record', 'هيئة تدريس, مدير الموارد البشرية, موظف', '', true, leavesWatingForDirect.length)}
                    {renderLink('طلبات الإجازات الاعتيادية', faFolderOpen, '/leave-record', 'أمين الكلية ,عميد الكلية', '', true, leavesWatingForGeneral.length)}
                    {renderLink('طلبات الإجازات العارضة', faFolderOpen, '/casual/leave-record', 'عميد الكلية ,أمين الكلية', '', true, casualLeavesWatingForGeneral.length)}
                    {renderLink('طلبات الإجازات المرضية', faFolderOpen, '/sick/leave-record', 'عميد الكلية, أمين الكلية', '', true, sickLeavesWatingForGeneral.length)}
                    {renderLink('إضافة تصريح', faScroll, '/permit', 'مدير الموارد البشرية')}
                    {renderLink('الاستفسارات', faCircleQuestion, '/inquiries', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {/* {renderLink('الاعدادات', faGear, '/sitting', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدریس, موظف')} */}
                    {renderLink('معلومات عامة', faCircleExclamation, '/agazaty', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {/* {renderLink('سجل الإجازات المرضية', faCircleH, '/sick-leaves-record', 'مدير الموارد البشرية')} */}
                    {renderLink('تحديث الإجازة المرضية', faCircleH, '/sick-leaves-record2', 'مدير الموارد البشرية', '', true, waitingSickLeaves.length + waitingCertifiedSickLeaves.length)}
                    <Link to={'/login'} className='link-SideBar text-danger hover-danger' onClick={handleLogout}>
                        <li className={`link-SideBar ${location.pathname === '/logout' ? 'active-link' : ''} tran position-relative`}>
                            <FontAwesomeIcon icon={faRightFromBracket} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                            <span className="col-xl-8 d-none d-xxl-block">الخروج</span>
                            <span className="tooltip-text d-block d-xxl-none">الخروج</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
