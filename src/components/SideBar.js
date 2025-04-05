import { Link, useLocation } from "react-router-dom";
import '../CSS/SideBar.css';
import '../CSS/LinkSideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faCalendarPlus, faSquarePlus, faUserPlus, faFolderOpen, faNotesMedical, faFolder, faUsers, faEnvelope, faCalendarDays, faCalendarCheck, faClipboard, faCircleQuestion, faGear, faCircleExclamation, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function SideBar({ userRole }) {
    const location = useLocation();
    const [showLeaveOptions, setShowLeaveOptions] = useState(false);
    const [showEmployeesOptions, setShowEmployeesOptions] = useState(false);

    const toggleLeaveOptions = () => {
        setShowLeaveOptions(!showLeaveOptions);
    };

    const toggleEmployeesOptions = () => {
        setShowEmployeesOptions(!showEmployeesOptions);
    };

    const renderLink = (title, icon, link, roles, extraClass = "") => {
        const rolesArray = roles.split(',').map(role => role.trim());
        if (!rolesArray.includes(userRole)) return null;

        return (
            <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
                <li className={`link-SideBar ${extraClass} ${location.pathname === link ? 'active-link' : ''} tran`}>
                    <FontAwesomeIcon icon={icon} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                    <span className="col-xl-8 d-none d-xxl-block">{title}</span>
                </li>
            </Link>
        );
    };

    const renderLink2 = (title, link, roles, extraClass = "") => {
        const rolesArray = roles.split(',').map(role => role.trim());
        if (!rolesArray.includes(userRole)) return null;

        return (
            <Link to={link} className={`link-SideBar2 ${extraClass}`} key={link}>
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
                    {renderLink('الرئيسية', faHouse, '/', 'manager, hr, user, موظف')}
                    {renderLink('الملف الشخصي', faUser, '/profile', 'manager, hr, user, موظف')}
                    
                    <Link className="link-SideBar">
                        <li className="link-SideBar" onClick={toggleLeaveOptions} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faCalendarPlus} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                            <span className="col-xl-8 d-none d-xxl-block">طلب إجازة</span>
                        </li>
                    </Link>
                    {showLeaveOptions && (
                        <ul className="list-unstyled pl-4">
                            {renderLink2('اعتيادية', '/normal-leave', 'hr, manager, user, موظف')}
                            {renderLink2('عارضة', '/casual-leave', 'hr, manager, user, موظف')}
                            {renderLink2('مرضية', '/sick-leave', 'hr, manager, user, موظف')}
                        </ul>
                    )}

                    {renderLink('القائم بالعمل', faEnvelope, '/messages', 'manager, hr, user, موظف')}
                    {renderLink('اجازاتي', faCalendarDays, '/agazaty', 'manager, hr, user, موظف')}
                    {renderLink('الأقسام', faSquarePlus, '/departments', 'manager, hr')}

                    {/* الموظفين مع قائمة فرعية */}
                    <Link className="link-SideBar">
                        <li className="link-SideBar" onClick={toggleEmployeesOptions} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faUsers} className="col-sm-12 col-xxl-2 pl-5" style={{ fontSize: '1.6em' }} />
                            <span className="col-xl-8 d-none d-xxl-block">الموظفين</span>
                        </li>
                    </Link>
                    {showEmployeesOptions && (
                        <ul className="list-unstyled pl-4">
                            {renderLink2('الموظفين النشطين', '/employees/active', 'manager, hr')}
                            {renderLink2('الموظفين غير النشطين', '/employees/inactive', 'manager, hr')}
                        </ul>
                    )}

                    {/* {renderLink('اجازة استثنائية', faNotesMedical, '/exceptional-leave', 'manager, hr')} */}
                    {renderLink('سجل الاجازات', faFolderOpen, '/des-requests', 'manager, hr')}
                    {renderLink('طلبات الاجازات', faFolderOpen, '/leave-record', 'manager')}
                    {renderLink('الاستفسارات', faCircleQuestion, '/inquiries', 'manager, hr, user, موظف')}
                    {renderLink('الاعدادات', faGear, '/sitting', 'manager, hr, user, موظف')}
                    {renderLink('التصريحات', faGear, '/parameter', 'hr')}
                    {renderLink('معلومات عامة', faCircleExclamation, '/about', 'manager, hr, user, موظف')}
                    {renderLink('سجل الاجازات المرضية', faCircleExclamation, '/sick-leaves-record', 'hr')}
                    {renderLink('تحديث الاجازة المرضية', faCircleExclamation, '/sick-leaves-record2', 'hr')}
                    {/* {renderLink('الأرشيف', faCircleExclamation, '/archives', 'hr')} */}
                    {renderLink('الخروج', faRightFromBracket, '/login', 'manager, hr, user, موظف', 'text-danger hover-danger')}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
