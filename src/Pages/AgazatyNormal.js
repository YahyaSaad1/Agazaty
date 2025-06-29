import React, { useState, useEffect } from "react";
import "../CSS/AgazatyNormal.css";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import OfficialLeaveReport from "./NormalReport";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AgazatyNormal() {
  const [normalLeaves, setNormalLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/AllNormalLeavesByUserId/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setNormalLeaves(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setNormalLeaves([]);
      });
  }, []);

  if (!normalLeaves || normalLeaves.length === 0) {
    return <LoadingOrError data={normalLeaves} />;
  }

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = normalLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(normalLeaves.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">
            سجل إجازاتي الاعتيادية
          </h2>
        </div>
        <div className="d-flex">
          <div className="ps-3">
            <button
              className="my-3 mx-1 btn btn-outline-primary d-flex justify-content-center align-items-center text-nowrap">
              <FontAwesomeIcon icon={faPrint} style={{ fontSize: "1.2em" }}/>
              <span className="d-none d-sm-inline">&nbsp;طباعة البيانات</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th className="th-mult">المرجع</th>
                <th className="th-mult">تاريخ البدء</th>
                <th className="th-mult">تاريخ الانتهاء</th>
                <th className="th-mult">عدد الأيام</th>
                <th className="th-mult">القائم بالعمل</th>
                <th className="th-mult">ملحوظات</th>
                <th className="th-mult">حالة الطلب</th>
                <th className="th-mult">طباعة</th>
                <th className="th-mult">الأرشيف</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((leave, index) => (
                <tr key={index}>
                  <th>#{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}</th>
                  <th>{new Date(leave.startDate).toLocaleDateString("ar-EG")}</th>
                  <th>{new Date(leave.endDate).toLocaleDateString("ar-EG")}</th>
                  <th>
                    {leave.days
                      .toString()
                      .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])}{" "}
                    أيام
                  </th>
                  <th>{leave.coworkerName}</th>
                  <th>{leave.notesFromEmployee || "بدون"}</th>
                  <th
                    className={
                      leave.leaveStatus === 0
                        ? "text-primary"
                        : leave.leaveStatus === 1
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {leave.leaveStatus === 0 ? "مُعلقة"
                      : leave.leaveStatus === 1 ? "مقبولة"
                      : "مرفوضة"}
                  </th>
                  <th>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        MySwal.fire({
                        title: 'تقرير الإجازة',
                        html: <OfficialLeaveReport leaveID={leave.id} />,
                        showConfirmButton: false,
                        showCloseButton: true,
                        width: '95%',
                        customClass: {
                          popup: 'text-end custom-swal-width',
                        }})}>
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                  </th>
                  <th><BtnLink id={leave.id} name="عرض الاجازة" link="/agazaty/normal-leave-request" className="btn btn-outline-primary"/></th>
                </tr>
              ))}
            </tbody>
          </table>

          {normalLeaves.length > rowsPerPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                    >
                      السابق
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                    >
                      التالي
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgazatyNormal;
