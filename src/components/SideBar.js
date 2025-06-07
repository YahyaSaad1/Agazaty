import { Link, useLocation, useNavigate } from "react-router-dom";
import "../CSS/SideBar.css";
import "../CSS/LinkSideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCalendarPlus,
  faHandshake,
  faUsersRectangle,
  faUsers,
  faFolderOpen,
  faCalendarDays,
  faCircleQuestion,
  faGear,
  faScroll,
  faCircleExclamation,
  faCircleH,
  faHouseMedicalCircleCheck,
  faRightFromBracket,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import {
  BASE_API_URL,
  roleName,
  token,
  userID,
  useUserData,
} from "../server/serves";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLeaveOptions, setShowLeaveOptions] = useState(false);
  const [showEmployeesOptions, setShowEmployeesOptions] = useState(false);
  const [showLeavesOptions, setShowLeavesOptions] = useState(false);
  const [showMyLeavesOptions, setShowMyLeavesOptions] = useState(false);
  const [leavesWating, setLeavesWating] = useState([]);
  const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
  const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
  const [casualLeavesWatingForGeneral, setCasualLeavesWatingForGeneral] =
    useState([]);
  const [sickLeavesWatingForGeneral, setSickLeavesWatingForGeneral] = useState(
    []
  );
  const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
  const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState(
    []
  );
  const sidebarRef = useRef();
  const userData = useUserData();

  // Fetch leave request data
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
      .catch((err) =>
        console.error("Error fetching waiting leaves by co-worker:", err)
      );

    fetch(
      `${BASE_API_URL}/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setLeavesWatingForDirect(data))
      .catch((err) =>
        console.error("Error fetching waiting leaves by direct manager:", err)
      );

    fetch(
      `${BASE_API_URL}/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setLeavesWatingForGeneral(data))
      .catch((err) =>
        console.error("Error fetching waiting leaves by general manager:", err)
      );

    fetch(
      `${BASE_API_URL}/api/CasualLeave/GetAllWaitingCasualLeavesByGeneral_ManagerID/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCasualLeavesWatingForGeneral(data))
      .catch((err) =>
        console.error("Error fetching waiting casual leaves:", err)
      );

    fetch(
      `${BASE_API_URL}/api/SickLeave/GetAllWaitingSickLeavesForGeneralManager/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setSickLeavesWatingForGeneral(data))
      .catch((err) =>
        console.error("Error fetching waiting sick leaves for GM:", err)
      );

    fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingSickLeavesForHR`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWaitingSickLeaves(data))
      .catch((err) =>
        console.error("Error fetching waiting sick leaves:", err)
      );

    fetch(`${BASE_API_URL}/api/SickLeave/GetAllWaitingCertifiedSickLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWaitingCertifiedSickLeaves(data))
      .catch((err) =>
        console.error("Error fetching waiting certified sick leaves:", err)
      );
  }, [userID]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleLeaveOptions = () => {
    setShowLeaveOptions(!showLeaveOptions);
  };

  const toggleEmployeesOptions = () => {
    setShowEmployeesOptions(!showEmployeesOptions);
  };

  const toggleLeavesOptions = () => {
    setShowLeavesOptions(!showLeavesOptions);
  };

  const toggleMyLeavesOptions = () => {
    setShowMyLeavesOptions(!showMyLeavesOptions);
  };

  const renderLink = (
    title,
    icon,
    link,
    roles,
    extraClass = "",
    hasBadge = false,
    badgeCount = 0
  ) => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (
      !rolesArray.includes(roleName) &&
      !(
        roles === "هيئة تدريس, مدير الموارد البشرية, موظف" &&
        userData.isDirectManager
      )
    )
      return null;

    return (
      <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
        <li
          className={`${
            location.pathname === link ? "active-link" : ""
          } tran position-relative`}
        >
          <FontAwesomeIcon
            icon={icon}
            className="  col-xxl-2 pl-5"
            style={{ fontSize: "1.6em" }}
          />
          <span
            className={`col-xl-8 d-none d-xxl-block d-xl-block ${
              isSidebarCollapsed ? "d-none" : ""
            }`}
          >
            {title}
          </span>
          <span className="tooltip-text d-block d-xxl-none">{title}</span>
          {hasBadge && badgeCount > 0 && (
            <span
              className="badge bg-danger text-white rounded-circle position-absolute"
              style={{
                top: "5px",
                right: "5px",
                fontSize: "12px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {badgeCount}
            </span>
          )}
        </li>
      </Link>
    );
  };

  const renderSubLink = (title, link, roles, extraClass = "") => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (!rolesArray.includes(roleName)) return null;

    return (
      <Link to={link} className={`link-SideBar2 ${extraClass}`} key={link}>
        <ul
          className={`p-0 ${extraClass} ${
            location.pathname === link ? "active-link" : ""
          } tran`}
        >
          <li
            className={`d-none ${
              isSidebarCollapsed ? "d-none" : "d-xxl-block d-xl-block"
            }`}
          >
            {title}
          </li>
        </ul>
      </Link>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`SideBar ${isSidebarCollapsed ? "collapsed" : ""}`}
      ref={sidebarRef}
    >
      <div className="sidebar-header">
        <Link
          to={"/agazaty"}
          className="Agazaty text-center text-primary"
          title="معلومات عن النظام"
        >
          {isSidebarCollapsed ? "أ" : "اجازاتي"}
        </Link>
        <button
          className="sidebar-toggle btn btn-link p-0"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="list-unstyled p-0 pt-2">
          {renderLink(
            "الرئيسية",
            faHouse,
            "/",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "الملف الشخصي",
            faUser,
            "/profile",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}

          {roleName !== "عميد الكلية" && (
            <div className="position-relative">
              <div className="link-SideBar">
                <li onClick={toggleLeaveOptions} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={faCalendarPlus}
                    className="  col-xxl-2 pl-5"
                    style={{ fontSize: "1.6em" }}
                  />
                  <span
                    className={`col-xl-8 d-none d-xxl-block d-xl-block ${
                      isSidebarCollapsed ? "d-none" : ""
                    }`}
                  >
                    طلب إجازة
                  </span>
                  <span className="tooltip-text d-block d-xxl-none">
                    طلب إجازة
                  </span>
                </li>
              </div>
              <div className="leave-options-hover d-block d-xxl-none">
                <ul className="list-unstyled">
                  {renderSubLink(
                    "اعتيادية",
                    "/normal-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/casual-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/sick-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                </ul>
              </div>
              {showLeaveOptions && (
                <ul
                  className={`list-unstyled pl-4 ${
                    isSidebarCollapsed
                      ? "d-none"
                      : "d-none d-xxl-block d-xl-block"
                  }`}
                >
                  {renderSubLink(
                    "اعتيادية",
                    "/normal-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/casual-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/sick-leave",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                </ul>
              )}
            </div>
          )}

          {renderLink(
            "طلبات القيام بالعمل",
            faHandshake,
            "/messages",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف",
            "",
            true,
            leavesWating.length
          )}

          {roleName !== "عميد الكلية" && (
            <div className="position-relative">
              <div className="link-SideBar">
                <li
                  onClick={toggleMyLeavesOptions}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="  col-xxl-2 pl-5"
                    style={{ fontSize: "1.6em" }}
                  />
                  <span
                    className={`col-xl-8  d-none  d-xxl-block d-xl-block ${
                      isSidebarCollapsed ? "d-none" : ""
                    }`}
                  >
                    اجازاتي
                  </span>
                  <span className="tooltip-text d-block d-xxl-none">
                    اجازاتي
                  </span>
                </li>
              </div>
              <div className="leave-options-hover d-block d-xxl-none">
                <ul className="list-unstyled">
                  {renderSubLink(
                    "اعتيادية",
                    "/agazaty/normal",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/agazaty/casual",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/agazaty/sick",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "تصاريح",
                    "/agazaty/permit",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                </ul>
              </div>
              {showMyLeavesOptions && (
                <ul
                  className={`list-unstyled pl-4 ${
                    isSidebarCollapsed
                      ? "d-none"
                      : "d-none d-xxl-block d-xl-block"
                  }`}
                >
                  {renderSubLink(
                    "اعتيادية",
                    "/agazaty/normal",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/agazaty/casual",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/agazaty/sick",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                  {renderSubLink(
                    "تصاريح",
                    "/agazaty/permit",
                    "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
                  )}
                </ul>
              )}
            </div>
          )}

          {renderLink(
            "الأقسام",
            faUsersRectangle,
            "/departments",
            "عميد الكلية, مدير الموارد البشرية"
          )}
          {renderLink(
            "الاجازات الرسمية",
            faCalendarDay,
            "/holidays",
            "مدير الموارد البشرية"
          )}

          {(roleName === "عميد الكلية" ||
            roleName === "مدير الموارد البشرية") && (
            <div className="position-relative">
              <div className="link-SideBar">
                <li
                  onClick={toggleEmployeesOptions}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="  col-xxl-2 pl-5"
                    style={{ fontSize: "1.6em" }}
                  />
                  <span
                    className={`col-xl-8 d-none d-xxl-block d-xl-block ${
                      isSidebarCollapsed ? "d-none" : ""
                    }`}
                  >
                    الموظفين
                  </span>
                  <span className="tooltip-text d-block d-xxl-none">
                    الموظفين
                  </span>
                </li>
              </div>
              <div className="leave-options-hover d-block d-xxl-none">
                <ul className="list-unstyled">
                  {renderSubLink(
                    "الموظفين النشطين",
                    "/employees/active",
                    "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
                  )}
                  {renderSubLink(
                    "الموظفين غير النشطين",
                    "/employees/nonactive",
                    "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
                  )}
                  {renderSubLink(
                    "رفع موظف",
                    "/UploadUsersExcel",
                    "مدير الموارد البشرية"
                  )}
                </ul>
              </div>
              {showEmployeesOptions && (
                <ul
                  className={`list-unstyled pl-4 ${
                    isSidebarCollapsed
                      ? "d-none"
                      : "d-none d-xxl-block d-xl-block"
                  }`}
                >
                  {renderSubLink(
                    "الموظفين النشطين",
                    "/employees/active",
                    "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
                  )}
                  {renderSubLink(
                    "الموظفين غير النشطين",
                    "/employees/nonactive",
                    "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
                  )}
                  {renderSubLink(
                    "رفع موظف",
                    "/UploadUsersExcel",
                    "مدير الموارد البشرية"
                  )}
                </ul>
              )}
            </div>
          )}

          {(roleName === "عميد الكلية" ||
            roleName === "مدير الموارد البشرية") && (
            <div className="position-relative">
              <div className="link-SideBar">
                <li onClick={toggleLeavesOptions} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    className="  col-xxl-2 pl-5"
                    style={{ fontSize: "1.6em" }}
                  />
                  <span
                    className={`col-xl-8 d-none d-xxl-block d-xl-block ${
                      isSidebarCollapsed ? "d-none" : ""
                    }`}
                  >
                    سجل الاجازات
                  </span>
                  <span className="tooltip-text d-block d-xxl-none">
                    سجل الاجازات
                  </span>
                </li>
              </div>
              <div className="leave-options-hover d-block d-xxl-none">
                <ul className="list-unstyled">
                  {renderSubLink(
                    "اعتيادية",
                    "/des-requests/normal",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/des-requests/casual",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/des-requests/sick",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "تصاريح",
                    "/des-requests/permit",
                    "مدير الموارد البشرية"
                  )}
                </ul>
              </div>
              {showLeavesOptions && (
                <ul
                  className={`list-unstyled pl-4 ${
                    isSidebarCollapsed
                      ? "d-none"
                      : "d-none d-xxl-block d-xl-block"
                  }`}
                >
                  {renderSubLink(
                    "اعتيادية",
                    "/des-requests/normal",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "عارضة",
                    "/des-requests/casual",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "مرضية",
                    "/des-requests/sick",
                    "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
                  )}
                  {renderSubLink(
                    "تصاريح",
                    "/des-requests/permit",
                    "مدير الموارد البشرية"
                  )}
                </ul>
              )}
            </div>
          )}

          {userData.isDirectManager &&
            renderLink(
              "طلبات الاجازات",
              faFolderOpen,
              "/leave-record",
              "هيئة تدريس, مدير الموارد البشرية, موظف",
              "",
              true,
              leavesWatingForDirect.length
            )}
          {renderLink(
            "طلبات الاجازات الاعتيادية",
            faFolderOpen,
            "/leave-record",
            "أمين الكلية, عميد الكلية",
            "",
            true,
            leavesWatingForGeneral.length
          )}
          {renderLink(
            "طلبات الاجازات العارضة",
            faFolderOpen,
            "/casual/leave-record",
            "عميد الكلية",
            "",
            true,
            casualLeavesWatingForGeneral.length
          )}
          {renderLink(
            "طلبات الاجازات المرضية",
            faFolderOpen,
            "/sick/leave-record",
            "عميد الكلية, أمين الكلية",
            "",
            true,
            sickLeavesWatingForGeneral.length
          )}
          {renderLink(
            "إضافة تصريح",
            faScroll,
            "/permit",
            "مدير الموارد البشرية"
          )}
          {renderLink(
            "الاستفسارات",
            faCircleQuestion,
            "/inquiries",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "معلومات عامة",
            faCircleExclamation,
            "/agazaty",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "تحديث الاجازة المرضية",
            faCircleH,
            "/sick-leaves-record2",
            "مدير الموارد البشرية",
            "",
            true,
            waitingSickLeaves.length + waitingCertifiedSickLeaves.length
          )}
          <Link
            to={"/login"}
            className="link-SideBar text-danger hover-danger"
            onClick={handleLogout}
          >
            <li
              className={`${
                location.pathname === "/login" ? "active-link" : ""
              } tran position-relative`}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="  col-xxl-2 pl-5"
                style={{ fontSize: "1.6em" }}
              />
              <span
                className={`col-xl-8 d-none d-xxl-block d-xl-block ${
                  isSidebarCollapsed ? "d-none" : ""
                }`}
              >
                الخروج
              </span>
              <span className="tooltip-text d-block d-xxl-none">الخروج</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
