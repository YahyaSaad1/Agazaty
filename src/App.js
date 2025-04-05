import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import LoginCom from './components/LoginCom';
import ForgetPassword from './components/ForgetPassword';
import OTPCode from './components/OTPCode';
import ResetPassword from './components/ResetPassword';
import About from './Pages/About';
import Messages from './Pages/Messages';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import Sitting from './Pages/Sitting';
import Agazaty from './Pages/Agazaty';
import AddDepartment from './Pages/AddDepartment';
import Departments from './Pages/Departments';
import Employees from './Pages/Employees';
import AddEmployee from './Pages/AddEmployee';
import LeaveRecord from './Pages/LeaveRecord';
import EditDepartment from './Pages/EditDepartment';
import Inquiries from './Pages/Inquiries';
import Des from './Pages/Des';
import NormalLeave from './components/NormalLeave';
import SickLeave from './components/SickLeave';
import CasualLeave from './components/CasualLeave';
import NormalLeaveRequest from './Pages/NormalLeaveRequest';
import SickLeaveRequest from './components/SickLeaveRequest';
import EditPassword from './components/EditPassword';
import Archives from './Pages/Archives';
import CasualLeaveRequestManger from './Pages/NormalLeaveRequestManager';
import NormalLeaveRequestManager from './Pages/NormalLeaveRequestManager';
import NormalRequestManager from './Pages/NormalLeaveRequestGeneralManager';
import GeneralManagerLeave from './Pages/GeneralManagerLeave';
import Parameter from './Pages/Parameter';
import UpdateNormalLeave from './Pages/UpdateNormalLeave';
import TrackLeave from './Pages/Leaves';
import EditEmployeeForHR from './Pages/EditEmployee';
import ExceptionalLeave from './Pages/ExceptionalLeave';
import SickLeavesRecord from './Pages/SickLeavesRecord';
import SickLeavesRecord2 from './Pages/SickLeavesRecord2';
import UpdateSickLeave from './components/UpdateSickLeave';
import UpdateSickLeave2 from './components/UpdateSickLeave2';


function App() {
  const userRole = 'hr';
  // const userID = "d717923f-9ef0-4ccf-9eb9-75983c582165" // عماد
  // const userID = "39331229-7e67-4e62-b560-fa9be8927f52"; // همام
  // const userID = "ec12a929-46ea-4c7e-8b69-bef0f9886386"; // يحيى
  // const userID = "5daf7dbb-369e-44a8-9565-02e93d75b3a6"; // سارة
  // const userID = "122e0eb2-ad19-411b-a3dd-1e96df18cc63"; // أمال
  const userID = "98954801-d453-40ff-940e-41e0ce88808f"; // مجدي
  localStorage.setItem("userID", userID);

  return (
    <div className="App" dir="rtl">
      <Routes>
        <Route path="/login" element={<Login />}>
          <Route index element={<LoginCom />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="otpcode" element={<OTPCode />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>

        <Route
          path="/"
          element={
            <div className="row d-flex" style={{ height: "100vh" }}>
              <div className="col-2 col-xl-1 col-xxl-2 sidebar p-0" style={{height: "100%", overflowY: "auto"}}>
                <SideBar userRole={userRole} />
              </div>        

              <div className="col p-0" style={{height: "100%", overflowY: "auto"}}>
                <NavBar userRole={userRole} />
                <Outlet />
              </div>
            </div>
          }
        >
          {/* خلصان */}
          <Route index element={<Home userRole={userRole} />} />
          <Route path="normal-leave" element={<NormalLeave />} />
          <Route path="casual-leave" element={<CasualLeave />} />
          <Route path="sick-leave" element={<SickLeave />} />
          <Route path="parameter" element={<Parameter />} />
          <Route path="messages" element={<Messages />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="agazaty" element={<Agazaty />} />
          <Route path="sitting" element={<Sitting />} />
          <Route path="normal-leave-request/:id" element={<NormalLeaveRequest />} />
          <Route path="casual-leave-request/:id" element={<CasualLeaveRequestManger />} />
          <Route path="sick-leave-request/:leaveID" element={<SickLeaveRequest />} />
          <Route path="update-sick-leave/:leaveID" element={<UpdateSickLeave />} />
          <Route path="update-sick-leave2/:leaveID" element={<UpdateSickLeave2 />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="departments" element={<Departments />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id/edit" element={<EditDepartment />} />
          <Route path="employees/active" element={<Employees />} />
          <Route path="employees/inactive" element={<Archives />} />
          {/* <Route path="archives" element={<Archives />} /> */}
          <Route path="add-Employee" element={<AddEmployee />} />
          <Route path="update-normal-leave/:leaveID" element={<UpdateNormalLeave />} />

          {/* عرض الاجازة بشكل منفصل */}
          <Route path="direct-manager/normal-leave-request/:id" element={<NormalLeaveRequestManager />} />
          <Route path="general-manager/normal-leave-request/:id" element={<NormalRequestManager />} />


          
          {/* محمود الهواري */}
          <Route path="edit-password" element={<EditPassword />} />

          <Route path="employee/:userId" element={<EditEmployeeForHR />} />
          <Route path="des-requests" element={<Des />} />

          {/* طلبات الاجازات عن المديرين */}
          <Route path="leave-record" element={<LeaveRecord />} />
          <Route path="general/leave-record" element={<GeneralManagerLeave />} />
          <Route path="exceptional-leave" element={<ExceptionalLeave />} />
          <Route path="sick-leaves-record" element={<SickLeavesRecord />} />
          <Route path="sick-leaves-record2" element={<SickLeavesRecord2 />} />

          {/* تتبع امازون */}
          <Route path="track-leave/:id" element={<TrackLeave />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

