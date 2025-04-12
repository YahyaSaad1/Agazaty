import { Link } from "react-router-dom";
import LinkSideBar from "./SideBarLink";
import '../CSS/SideBar.css';
import { faHouse, faUser, faCalendarPlus, faSquarePlus, faUserPlus, faFolderOpen, faNotesMedical, faFolder, faUsers, faEnvelope, faCalendarDays, faCalendarCheck, faClipboard, faCircleQuestion, faGear, faCircleExclamation, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function OldSideBar({ userRole }) {

    const items = [
        { title: 'الرئيسية', icon: faHouse, link: '/', status: true, role: 'عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف' },
        { title: 'الملف الشخصي', icon: faUser, link: '/profile', status: true, role: 'manager, hr, user, موظف' },
        { title: 'طلب اجازة', icon: faCalendarPlus, link: '/normal-leave', status: true, role: 'hr, manager, user, موظف' },
        { title: 'القائم بالعمل', icon: faEnvelope, link: '/messages', status: true, UserHint: true, role: 'عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف' },
        { title: 'اجازاتي', icon: faCalendarDays, link: '/agazaty', status: true, role: 'manager, hr, user, موظف' },
        { title: 'الأقسام', icon: faSquarePlus, link: '/departments', status: true, role: 'manager, hr' },
        { title: 'الموظفين', icon: faUsers, link: '/employees', status: true, role: 'manager, hr' },
        { title: 'اجازة استثنائية', icon: faNotesMedical, link: '/exceptional-leave', status: true, role: 'عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف' },
        { title: 'سجل الاجازات', icon: faFolderOpen, link: '/des-requests', status: true, role: 'manager, hr' },
        { title: 'طلبات الاجازات', icon: faFolderOpen, link: '/leave-record', status: true, ManagerHint: true, role: 'manager' },
        { title: 'الاستفسارات', icon: faCircleQuestion, link: '/inquiries', status: true, role: 'manager, hr, user, موظف' },
        { title: 'الاعدادات', icon: faGear, link: '/sitting', status: true, role: 'manager, hr, user, موظف' },
        { title: 'التصريحات', icon: faGear, link: '/permit', status: true, role: 'hr' },
        { title: 'معلومات عامة', icon: faCircleExclamation, link: '/about', status: true, role: 'manager, hr, user, موظف' },
        { title: 'الاجازات المرضية', icon: faCircleExclamation, link: '/sick-leaves-record', status: true, role: 'hr' },
        { title: 'تحديث الاجازة المرضية', icon: faCircleExclamation, link: '/sick-leaves-record2', status: true, HRHint: true, role: 'hr' },
        { title: 'الأرشيف', icon: faCircleExclamation, link: '/archives', status: true, role: 'hr' },
        { title: 'الخروج', icon: faRightFromBracket, link: '/login', status: true, role: 'manager, hr, user, موظف', class: 'text-danger hover-danger' },
    ];
    
    // تصفية العناصر بناءً على الدور
    const filteredItems = items.filter((item) => {
        // التحقق مما إذا كان الـ userRole موجوداً في قائمة الأدوار الخاصة بكل عنصر
        const roles = item.role.split(',').map(role => role.trim());
        return item.status === true && roles.includes(userRole);
    });

    return (
        <div className="pt-3 SideBar">
            <div>
                <Link to={'/about'} className="Agazaty d-flex text-center text-primary" title="معلومات عن النظام">اجازاتي</Link>
            </div>
            <div>
                <ul className="list-unstyled p-0 pt-2">
                    <LinkSideBar items={filteredItems} />
                </ul>
            </div>
        </div>
    );
}

export default OldSideBar;
