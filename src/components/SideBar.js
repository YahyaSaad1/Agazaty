import { Link, useLocation } from "react-router-dom";
import '../CSS/SideBar.css';
import '../CSS/LinkSideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faCalendarPlus, faSquarePlus, faUserPlus, faFolderOpen, faNotesMedical, faFolder, faUsers, faEnvelope, faCalendarDays, faCalendarCheck, faClipboard, faCircleQuestion, faGear, faCircleExclamation, faRightFromBracket, faHandshake, faUsersRectangle, faScroll, faHouseMedicalCircleCheck, faCircleH } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function SideBar() {
    const location = useLocation();
    const userID = localStorage.getItem("userID");
    const [showLeaveOptions, setShowLeaveOptions] = useState(false);
    const [showEmployeesOptions, setShowEmployeesOptions] = useState(false);
    const [showLeavesUserOptions, setShowLeavesUserOptions] = useState(false);
    const [showLeavesOptions, setShowLeavesOptions] = useState(false);
    const [leavesWating, setLeavesWating] = useState([]);
    const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
    const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
    const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
    const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState([]);
    const [user, setUser] = useState({});
    const userRole = user.roleName


    // Fetch leave request data
    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByCoWorkerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWating(data));
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWatingForDirect(data));
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWatingForGeneral(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingSickLeaves`)
            .then((res) => res.json())
            .then((data) => setWaitingSickLeaves(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingCertifiedSickLeaves`)
            .then((res) => res.json())
            .then((data) => setWaitingCertifiedSickLeaves(data));
    }, []);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setUser(data))
    }, [userID])

    const toggleLeaveOptions = () => {
        setShowLeaveOptions(!showLeaveOptions);
    };

    const toggleEmployeesOptions = () => {
        setShowEmployeesOptions(!showEmployeesOptions);
    };

    const toggleLeavesOptions = () => {
        setShowLeavesOptions(!showLeavesOptions);
    };


    const toggleLeavesUserOptions = () => {
        setShowLeavesUserOptions(!showLeavesUserOptions);
    };

    const renderLink = (title, icon, link, roles, extraClass = "", hasBadge = false, badgeCount = 0) => {
        const rolesArray = roles.split(',').map(role => role.trim());
        if (!rolesArray.includes(userRole)) return null;

        return (
            <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
                <li className={`link-SideBar ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran position-relative`}>
                    <FontAwesomeIcon icon={icon} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                    <span className="col-xl-8 d-none d-xxl-block">{title}</span>
                    {/* Tooltip for small screens */}
                    <span className="tooltip-text d-block d-xxl-none">{title}</span>
                    {/* Red badge for requests */}
                    {hasBadge && badgeCount > 0 && (
                        <span className="badge bg-danger text-white rounded-circle position-absolute" style={{ top: '5px', right: '5px', fontSize: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {badgeCount}
                        </span>
                    )}
                </li>
            </Link>
        );
    };


    const renderLink11 = (title, icon, link, roles, extraClass = "", hasBadge = false, badgeCount = 0) => {
        const rolesArray = roles.split(',').map(role => role.trim());
        if (!rolesArray.includes(userRole)) return null;

        return (
            user.isDirectManager === true && <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
            <li className={`link-SideBar ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran position-relative`}>
                <FontAwesomeIcon icon={icon} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                <span className="col-xl-8 d-none d-xxl-block">{title}</span>
                {/* Tooltip for small screens */}
                <span className="tooltip-text d-block d-xxl-none">{title}</span>
                {/* Red badge for requests */}
                {hasBadge && badgeCount > 0 && (
                    <span className="badge bg-danger text-white rounded-circle position-absolute" style={{ top: '5px', right: '5px', fontSize: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {badgeCount}
                    </span>
                )}
            </li>
        </Link>
            
        );
    };

    const renderLink2 = (title, link, roles, extraClass = "") => {
        const rolesArray1 = roles.split(',').map(role => role.trim());
        if (!rolesArray1.includes(userRole)) return null;

        return (
            <Link to={link} className={`link-SideBar2 ${extraClass}`} key={link}>
                <ul className={`p-0 ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran`}>
                    <li className="d-none d-xxl-block">{title}</li>
                </ul>
            </Link>
        );
    };

    const renderLink3 = (title, link, roles, extraClass = "") => {
        const rolesArray2 = roles.split(',').map(role => role.trim());
        if (!rolesArray2.includes(userRole)) return null;

        return (
            <Link to={link} className={`link-SideBar3 ${extraClass}`} key={link}>
                <ul className={`p-0 ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran`}>
                    <li className="d-none d-xxl-block">{title}</li>
                </ul>
            </Link>
        );
    };

    return (
        <div className="pt-3 SideBar">
            <div>
                <Link to={'/about'} className="Agazaty d-flex text-center text-primary" title="معلومات عن النظام">اجازاتي</Link>
            </div>
            <div>
                <ul className="list-unstyled p-0 pt-2">
                    {renderLink('الرئيسية', faHouse, '/', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {renderLink('الملف الشخصي', faUser, '/profile', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}

                    {/* Leave Request with hover select box on small screens */}
                    {userRole !== 'عميد الكلية' &&
                    <div className="position-relative">
                        <Link className="link-SideBar">
                            <li className="link-SideBar" onClick={toggleLeaveOptions} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faCalendarPlus} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">طلب إجازة</span>
                                <span className="tooltip-text d-block d-xxl-none">طلب إجازة</span>
                            </li>
                        </Link>
                        {/* Select box on hover for small screens */}
                        <div className="leave-options-hover d-block d-xxl-none">
                            <ul className="list-unstyled">
                                {renderLink2('اعتيادية', '/normal-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                {renderLink2('عارضة', '/casual-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                {renderLink2('مرضية', '/sick-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                            </ul>
                        </div>
                        {/* Normal dropdown for large screens */}
                        {showLeaveOptions && (
                            <ul className="list-unstyled pl-4 d-none d-xxl-block">
                                {renderLink2('اعتيادية', '/normal-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                {renderLink2('عارضة', '/casual-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                                {renderLink2('مرضية', '/sick-leave', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                            </ul>
                        )}
                    </div>}

                    {renderLink('طلبات القيام بالعمل', faHandshake, '/messages', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف', '', true, leavesWating.length)}
                    {/* {renderLink('اجازاتي', faCalendarDays, '/agazaty', 'مدير الموارد البشرية, هيئة تدريس, موظف')} */}
                    
                    
                    {(userRole !== "عميد الكلية") &&
                        <Link className="link-SideBar">
                            <li className="link-SideBar" onClick={toggleLeavesUserOptions} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faCalendarDays} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">اجازاتي</span>
                                <span className="tooltip-text d-block d-xxl-none">اجازاتي</span>
                            </li>
                        </Link>
                    }
                    {showLeavesUserOptions && (
                        <ul className="list-unstyled pl-4 d-none d-xxl-block">
                            {renderLink2('اعتيادية', '/agazaty/normal', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                            {renderLink2('عارضة', '/agazaty/casual', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                            {renderLink2('مرضية', '/agazaty/sick', 'أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                        </ul>
                    )}
                    
                    
                    
                    
                    {renderLink('الأقسام', faUsersRectangle, '/departments', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية')}

                    {(userRole === "عميد الكلية" || userRole === "مدير الموارد البشرية") &&
                        <Link className="link-SideBar">
                            <li className="link-SideBar" onClick={toggleEmployeesOptions} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faUsers} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">الموظفين</span>
                                <span className="tooltip-text d-block d-xxl-none">الموظفين</span>
                            </li>
                        </Link>
                    }
                    {showEmployeesOptions && (
                        <ul className="list-unstyled pl-4 d-none d-xxl-block">
                            {renderLink2('الموظفين النشيطين', '/employees/active', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية')}
                            {renderLink2('الموظفين غير النشيطين', '/employees/inactive', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية')}
                        </ul>
                    )}

                    {(userRole === "عميد الكلية" || userRole === "مدير الموارد البشرية") &&
                        <Link className="link-SideBar">
                            <li className="link-SideBar" onClick={toggleLeavesOptions} style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faFolderOpen} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                                <span className="col-xl-8 d-none d-xxl-block">سجل الاجازات</span>
                                <span className="tooltip-text d-block d-xxl-none">سجل الاجازات</span>
                            </li>
                        </Link>
                    }
                    {showLeavesOptions && (
                        <ul className="list-unstyled pl-4 d-none d-xxl-block">
                            {renderLink3('اعتيادية', '/des-requests/normal', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                            {renderLink3('عارضة', '/des-requests/casual', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                            {renderLink3('مرضية', '/des-requests/sick', 'أمين الكلية, مدير الموارد البشرية, عميد الكلية')}
                            {renderLink3('تصاريح', '/des-requests/permit', 'مدير الموارد البشرية')}
                        </ul>
                    )}
                    {renderLink11('طلبات الاجازات', faFolderOpen, '/leave-record', 'هيئة تدريس', '', true, (leavesWatingForDirect.length))}
                    {renderLink('طلبات الاجازات', faFolderOpen, '/general/leave-record', 'أمين الكلية, عميد الكلية', '', true, (leavesWatingForGeneral.length))}
                    {renderLink('الاستفسارات', faCircleQuestion, '/inquiries', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {renderLink('الاعدادات', faGear, '/sitting', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدریس, موظف')}
                    {renderLink('التصريحات', faScroll, '/permit', 'مدير الموارد البشرية')}
                    {renderLink('معلومات عامة', faCircleExclamation, '/about', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف')}
                    {renderLink('سجل الاجازات المرضية', faCircleH, '/sick-leaves-record', 'مدير الموارد البشرية')}
                    {renderLink('تحديث الاجازة المرضية', faHouseMedicalCircleCheck, '/sick-leaves-record2', 'مدير الموارد البشرية', '', true, waitingSickLeaves.length + waitingCertifiedSickLeaves.length)}
                    {renderLink('الخروج', faRightFromBracket, '/login', 'أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف', 'text-danger hover-danger')}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;