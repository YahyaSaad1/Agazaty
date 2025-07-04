import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import LoginCom from "./components/LoginCom";
import ForgetPassword from "./components/ForgetPassword";
import OTPCode from "./components/OTPCode";
import ResetPassword from "./components/ResetPassword";
import CoWorker from "./Pages/CoWorker";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Sitting from "./Pages/Sitting";
import AddDepartment from "./Pages/AddDepartment";
import Departments from "./Pages/Departments";
import Employees from "./Pages/Employees";
import AddEmployee from "./Pages/AddEmployee";
import NormalLeaveRecord from "./Pages/NormalLeaveRecord";
import EditDepartment from "./Pages/EditDepartment";
import Inquiries from "./Pages/Inquiries";
import NormalLeave from "./components/NormalLeave";
import SickLeave from "./components/SickLeave";
import CasualLeave from "./components/CasualLeave";
import NormalLeaveRequest from "./Pages/NormalLeaveRequest";
import SickLeaveRequest from "./components/SickLeaveRequest";
import EditPassword from "./components/EditPassword";
import Archives from "./Pages/Archives";
import CasualLeaveRequestManger from "./Pages/CasualLeaveRequestManger";
import NormalRequestManager from "./Pages/NormalRequestManager";
import UpdateNormalLeave from "./Pages/UpdateNormalLeave";
import EditEmployeeForHR from "./Pages/EditEmployee";
import SickLeavesRecord2 from "./Pages/SickLeavesRecord2";
import UpdateSickLeave from "./components/UpdateSickLeave";
import UpdateSickLeave2 from "./components/UpdateSickLeave2";
import DesNormal from "./Pages/DesNormal";
import DesCasual from "./Pages/DesCasual";
import DesSick from "./Pages/DesSick";

import Permit from "./Pages/Permit";
import PermitLeave from "./Pages/PermitLeave";
import AgazatyPermit from "./Pages/AgazatyPermit";
import ProfileForHR from "./Pages/ProfileForHR";
import AgazatyNormal from "./Pages/AgazatyNormal";
import AgazatySick from "./Pages/AgazatySick";
import AgazatyCasual from "./Pages/AgazatyCasual";
import UserNormalLeaveRequest from "./Pages/UserNormalLeaveRequest";
import UserCasualLeaveRequest from "./Pages/UserCasualLeaveRequest";
import Error404 from "./Pages/Error404";
import Holidays from "./Pages/Holiday";
import AddHoliday from "./Pages/AddHoliday";
import EditHoliday from "./Pages/EditHoliday";
import UploadUsersExcel from "./Pages/UploadUsersExcel";
import RequireAuth from "./RequireAuth";
import Error403 from "./Pages/Error403";
import ChatBot from "./Pages/ChatBot";
import React from "react";
import CasualRequestManager from "./Pages/CasualRequestManager";
import CasualLeaveRecord from "./Pages/CasualLeaveRecord";
import SickLeaveRecord from "./Pages/SickLeaveRecord";
import SickRequestManager from "./Pages/SickRequestManager";
import UserSickLeaveRequest from "./Pages/UserSickLeaveRequest";
import Agazaty from "./Pages/Agazaty";
import DesPermits from "./Pages/DesPermits";

function App() {
  // const userID = "30309092701066"; // مجدي
  // const userID = "30203633632333"; // عماد
  // const userID = "10101010101010"; // يحيى سعد
  // const userID = "40404040404040"; // مصطفى .. موظف
  // const userID = "80808080808080"; // عبدالله .. موظف

  const ErrorBoundary = ({ children }) => {
    const navigate = useNavigate();

    const handleError = (status) => {
      if (status === 403) {
        navigate("/error403");
      } else if (status === 404) {
        navigate("/error404");
      }
    };

    return <div>{React.cloneElement(children, { handleError })}</div>;
  };

  return (
    <div className="App" dir="rtl">
      <Routes>
        <Route path="/" element={<Navigate to="/agazaty" />} />
        <Route path="/login" element={<Login />}>
          <Route index element={<LoginCom />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="otpcode" element={<OTPCode />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>

        <Route path="agazaty" element={<Agazaty />} />
        <Route path="ChatBot" element={<ChatBot />} />

        <Route element={<RequireAuth />}>
          <Route path="error403" element={<Error403 />} />
          <Route path="error404" element={<Error404 />} />
          <Route
            path="/"
            element={
              <div className="d-flex vh-100">
                <div className="sidebar p-0 flex-shrink-0" style={{ overflowY: "auto" }}>
                  <SideBar />
                </div>

                <div className="p-0 flex-grow-1 d-flex flex-column" style={{ overflowY: "auto" }}>
                  <NavBar className="sticky-top" style={{ zIndex: 1020 }} />

                  <div className="flex-grow-1 overflow-auto">
                    <Outlet />
                  </div>
                </div>
              </div>
            }>


      




            {/* خلصان */}
            <Route index element={<Home />} />
            <Route path="request/normal-leave" element={<NormalLeave />} />
            <Route path="request/casual-leave" element={<CasualLeave />} />
            <Route path="request/sick-leave" element={<SickLeave />} />
            <Route path="Permit" element={<Permit />} />

            <Route path="holidays" element={<Holidays />} />
            <Route path="add-holiday" element={<AddHoliday />} />
            <Route path="holiday/edit/:holidayID" element={<EditHoliday />} />

            <Route path="coworker" element={<CoWorker />} />
            <Route path="profile" element={<Profile />} />

            <Route path="agazaty2/normal" element={<AgazatyNormal />} />
            <Route path="agazaty2/casual" element={<AgazatyCasual />} />
            <Route path="agazaty2/sick" element={<AgazatySick />} />
            <Route path="agazaty2/permit" element={<AgazatyPermit />} />

            <Route
              path="normal-leave-request/:leaveID"
              element={
                <ErrorBoundary>
                  <NormalLeaveRequest />
                </ErrorBoundary>
              }
            />
            <Route path="casual-leave-request/:leaveID" element={<CasualLeaveRequestManger />}/>
            <Route path="sick-leave-request/:leaveID" element={<SickLeaveRequest />}/>
            <Route path="update-sick-leave/:leaveID" element={<UpdateSickLeave />}/>
            <Route path="update-sick-leave2/:leaveID" element={<UpdateSickLeave2 />}/>
            <Route path="permit-leave/:permitID" element={<PermitLeave />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="editprofile" element={<EditProfile />} />
            {/* <Route path="hr/editprofile" element={<EditProfileForHR />} /> */}
            <Route path="departments" element={<Departments />} />
            <Route path="employees/add-employee" element={<AddEmployee />} />
            <Route path="error404" element={<Error404 />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="department/edit/:departmentID" element={<EditDepartment />} />
            <Route path="employees/active" element={<Employees />} />
            <Route path="employees/nonactive" element={<Archives />} />
            <Route path="employees/UploadUsersExcel" element={<UploadUsersExcel />} />
            <Route path="sitting" element={<Sitting />} />
            {/* <Route path="archives" element={<Archives />} /> */}

            <Route path="update-normal-leave/:leaveID" element={<UpdateNormalLeave />}/>

            {/* عرض الاجازة بشكل منفصل */}
            <Route path="manager-normal-leave-request/:id" element={<NormalRequestManager />}/>
            <Route path="manager-casual-leave-request/:id" element={<CasualRequestManager />}/>
            <Route path="manager-sick-leave-request/:id" element={<SickRequestManager />}/>

            {/* سجل الإجازات الشامل */}
            <Route path="employee/:userId" element={<EditEmployeeForHR />} />
            <Route path="des-requests/normal" element={<DesNormal />} />
            <Route path="des-requests/casual" element={<DesCasual />} />
            <Route path="des-requests/sick" element={<DesSick />} />
            <Route path="des-requests/permit" element={<DesPermits />} />
            <Route path="edit-password" element={<EditPassword />} />

            {/* طلبات الإجازات عن المديرين */}
            <Route path="record/normal/leave" element={<NormalLeaveRecord />} />
            <Route path="record/casual/leave" element={<CasualLeaveRecord />} />
            <Route path="record/sick/leave" element={<SickLeaveRecord />} />

            <Route path="record/sick-leaves" element={<SickLeavesRecord2 />} />

            <Route path="profile/user/:userID" element={<ProfileForHR />} />

            <Route path="agazaty/normal-leave-request/:leaveID" element={<UserNormalLeaveRequest />} />
            <Route
              path="agazaty/casual-leave-request/:leaveID"
              element={
                <ErrorBoundary>
                  <UserCasualLeaveRequest />
                </ErrorBoundary>
              }
            />
            <Route path="agazaty/sick-leave-request/:leaveID" element={<UserSickLeaveRequest />}/>
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
