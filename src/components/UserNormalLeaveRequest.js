import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../CSS/PreviousRequests.css";
import {faCirclePlus, faCalendarDays, faPrint} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BtnLink from "./BtnLink";
import { BASE_API_URL, token, userID } from "../server/serves";

function UserNormalLeaveRequest() {
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [leaveType, setLeaveType] = useState("اعتيادية");
  const [normalLeaves, setNormalLeaves] = useState([]);
  const [casualLeaves, setCasualLeaves] = useState([]);
  const [sickLeaves, setSickLeaves] = useState([]);

  useEffect(() => {
  fetch(`${BASE_API_URL}/api/CasualLeave/GetAllCasualLeavesByUserId/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setCasualLeaves(Array.isArray(data) ? data : []))
    .catch((err) => console.error("Error fetching data:", err));
}, [userID]);


  useEffect(() => {
  const fetchSickLeaves = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetAllSickLeavesByUserID/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setSickLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sick leaves:", error);
    }
  };

  fetchSickLeaves();
}, [userID, token]);


  useEffect(() => {
  fetch(`${BASE_API_URL}/api/NormalLeave/GetLeaveTypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setLeaveTypes(data))
    .catch((err) => console.error("Error fetching leave types:", err));
}, []);

useEffect(() => {
  fetch(`${BASE_API_URL}/api/NormalLeave/AllNormalLeavesByUserId/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
    },
  })
    .then((res) => res.json())
    .then((data) => setNormalLeaves(Array.isArray(data) ? data : []))
    .catch((err) => console.error("Error fetching normal leaves:", err)); // معالجة الأخطاء
}, [userID]);


  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4 className="text-bold">اجازاتك السابقة</h4>
        <div className="d-flex">
          <div className="me-2 btn btn-primary my-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faCalendarDays} style={{fontSize: "1.2em"}} />
            <select
              className="d-none d-sm-inline bg-primary border-0 text-light custom-select-fix me-1"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              aria-label="Default select example"
            >
              {LeaveTypes.map((LeaveType, index) => (
                <option key={index} value={LeaveType}>
                  {LeaveType}
                </option>
              ))}
            </select>
          </div>
          <Link to="/request/normal-leave" role="button" className="me-2 btn btn-primary my-3 d-flex align-items-center" >
            <FontAwesomeIcon icon={faCirclePlus} style={{fontSize: "1.2em"}} />
            <span className="d-none d-sm-inline me-1">&nbsp;إجازة جديدة</span>
          </Link>
        </div>
      </div>

      <div className="box-private mt-2">
        {leaveType === "اعتيادية" ? (
          normalLeaves.length === 0 ? (
            <p className="text-center mt-3 text-danger">
              لا يوجد اجازات اعتيادية لديك
            </p>
          ) : (
            <div className="row">
              <div className="table-responsive">
                <table className="m-0 table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">نوع الإجازة</th>
                      <th scope="col">تاريخ البدء</th>
                      <th scope="col">عدد الأيام</th>
                      <th scope="col">القائم بالعمل</th>
                      <th scope="col">ملحوظات</th>
                      <th scope="col">حالة الطلب</th>
                      <th scope="col">الأرشيف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {normalLeaves.slice(-5).map((leave, index) => (
                      <tr key={index}>
                        <th>اعتيادية</th>
                        <th>{new Date(leave.startDate).toLocaleDateString('ar-EG')}</th>
                        <th>{leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])} أيام</th>
                        <th>{leave.coworkerName}</th>
                        <th>{leave.notesFromEmployee || "بدون"}</th>
                        <th>
                          {leave.holder === 0 ? (<span className="text-primary cursor-pointer" title={leave.coworkerName}> في انتظار القائم بالعمل</span>
                          ) : leave.holder === 1 ? (<span className="text-primary cursor-pointer" title={leave.directManagerName}>في انتظار المدير المباشر</span>
                          ) : leave.holder === 2 ? (<span className="text-primary cursor-pointer" title={leave.generalManagerName}>في انتظار المدير المختص</span>
                          ) : leave.coWorker_Decision === false ? (<span className="text-danger cursor-pointer"title={leave.coworkerName}>مرفوضة من القائم بالعمل</span>
                          ) : leave.directManager_Decision === false ? (<span className="text-danger cursor-pointer" title={leave.directManagerName}>مرفوضة من المدير المباشر</span>
                          ) : leave.generalManager_Decision === false ? (<span className="text-danger cursor-pointer" title={leave.generalManagerName}>مرفوضة من المدير المختص</span>
                          ) : (<span className="text-success cursor-pointer" title={"تمت"}> مقبولة</span>
                          )}
                        </th>
                        <td>
                          <BtnLink
                            id={leave.id}
                            name="عرض الإجازة"
                            link={`/agazaty/normal-leave-request`}
                            className="btn btn-outline-primary"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
          )
        ) : leaveType === "عارضة" ? (
          casualLeaves.length === 0 ? (
            <p className="text-center mt-3 text-danger">
              لا يوجد اجازات عارضة لديك
            </p>
          ) : (
            <table className="m-0 table table-striped">
              <thead>
                <tr>
                  <th scope="col">نوع الإجازة</th>
                  <th scope="col">تاريخ البدء</th>
                  <th scope="col">تاريخ الانتهاء</th>
                  <th scope="col">عدد الأيام</th>
                  <th scope="col">ملحوظة</th>
                  <th scope="col">طباعة</th>
                  <th scope="col">الأرشيف</th>
                </tr>
              </thead>
              <tbody>
                {casualLeaves.slice(-5).map((leave, index) => (
                  <tr key={index}>
                    <th>عارضة</th>
                    <th>{new Date(leave.startDate).toLocaleDateString('ar-EG')}</th>
                    <th>{new Date(leave.endDate).toLocaleDateString('ar-EG')}</th>
                    <th>{leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])} أيام</th>
                      <th>{leave.notes || "بدون"}</th><th>
                      <FontAwesomeIcon
                        icon={faPrint}
                        fontSize={"26px"}
                        color="blue"
                        className="printer"
                      />
                    </th>
                    <th>
                      <BtnLink
                        id={leave.id}
                        name="عرض الإجازة"
                        link="/agazaty/casual-leave-request"
                        className="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : leaveType === "مرضية" ? (
          sickLeaves.length === 0 ? (
            <p className="text-center mt-3 text-danger">
              لا يوجد اجازات مرضية لديك
            </p>
          ) : (
            <table className="m-0 table table-striped">
              <thead>
                <tr>
                  <th scope="col">نوع الإجازة</th>
                  <th scope="col">تاريخ البدء</th>
                  <th scope="col">تاريخ الانتهاء</th>
                  <th scope="col">عدد الأيام</th>
                  <th scope="col">حالة الطلب</th>
                  <th scope="col">طباعة</th>
                  <th scope="col">الأرشيف</th>
                </tr>
              </thead>
              <tbody>
                {sickLeaves.slice(-5).map((leave, index) => (
                  <tr key={index}>
                    <th>مرضية</th>
                    {leave.startDate === "0001-01-01T00:00:00" ? <th className="text-danger">لم يُحدد بعد</th>
                    :<th>{new Date(leave.startDate).toLocaleDateString('ar-EG')}</th>}

                    {leave.endDate === "0001-01-01T00:00:00" ? <th className="text-danger">لم يُحدد بعد</th>
                    :<th>{new Date(leave.endDate).toLocaleDateString('ar-EG')}</th>}

                    {leave.days === null ? <th className="text-danger">لم يُحتسب بعد</th>
                      :<th>{leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])} أيام</th>}

                    {leave.certified === true
                      ? <th className="text-success">مقبولة</th>
                      : (leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === false)
                      ? <th className="text-primary">مُعلقة عند التحديث الأول</th>
                      : (leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === true)
                      ? <th className="text-primary">مُعلقة عند التحديث الثاني</th>
                      : <th className="text-danger">مرفوضة</th>
                    }
                    <th>
                      <FontAwesomeIcon
                        icon={faPrint}
                        fontSize={"26px"}
                        color="blue"
                        className="printer"
                      />
                    </th>
                    <th>
                      <BtnLink
                        id={leave.id}
                        name="عرض الإجازة"
                        link="/sick-leave-request"
                        className="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : null}
      </div>
    </div>
  );
}

export default UserNormalLeaveRequest;
