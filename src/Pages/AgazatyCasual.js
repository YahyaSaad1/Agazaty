import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import OfficialLeaveReport from "./CasualReport";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CasualReport from "../components/CasualReport";

function AgazatyCasual() {
  const [casualLeaves, setCasualLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch(
      `${BASE_API_URL}/api/CasualLeave/GetAllCasualLeavesByUserId/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCasualLeaves(data);
        } else {
          console.warn("Expected array but got:", data);
          setCasualLeaves([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching casual leaves:", error);
        setCasualLeaves([]); // fallback
      });
  }, [userID]);

  if (!casualLeaves || casualLeaves.length === 0) {
    return <LoadingOrError data={casualLeaves} />;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = casualLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(casualLeaves.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0" style={{ whiteSpace: "nowrap" }}>
            سجل الإجازات العارضة
          </h2>
        </div>
        <div className="ps-3">
          <button
            className="my-3 mx-1 btn btn-outline-primary d-flex justify-content-center align-items-center" style={{ whiteSpace: "nowrap" }}>
            <FontAwesomeIcon icon={faPrint} style={{ fontSize: "1.4rem" }}/>
            <span className="d-none d-sm-inline">&nbsp;طباعة البيانات</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>المرجع</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>تاريخ البدء</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>تاريخ الانتهاء</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>عدد الأيام</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>ملحوظة</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>طباعة</th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>الأرشيف</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length > 0 &&
                currentRows.map((leave, index) => (
                  <tr key={index}>
                    <th>#{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}</th>
                    <th>{new Date(leave.startDate).toLocaleDateString("ar-EG")}</th>
                    <th>{new Date(leave.endDate).toLocaleDateString("ar-EG")}</th>
                    <th>{leave.days.toString().replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit])}{" "}أيام</th>
                    <th>{leave.notes ? leave.notes : "بدون"}</th>
                    <th>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          MySwal.fire({
                          title: 'تقرير الإجازة',
                          html: <CasualReport leaveID={leave.id} />,
                          showConfirmButton: false,
                          showCloseButton: true,
                          width: '95%',
                          customClass: {
                            popup: 'text-end custom-swal-width',
                          }})}>
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </th>
                    <th><BtnLink id={leave.id} name="عرض الاجازة" link="/agazaty/casual-leave-request" className="btn btn-outline-primary" /></th>
                  </tr>
                ))}
            </tbody>
          </table>

          {casualLeaves.length > rowsPerPage && (
            <div style={{display: "flex",justifyContent: "center",marginTop: "20px",}}>
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
                  \{" "}
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

export default AgazatyCasual;
