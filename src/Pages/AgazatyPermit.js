import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import PermitReport from "../components/PermitReport";
import withReactContent from "sweetalert2-react-content";

function AgazatyPermit() {
  const [permitLeaves, setPermitLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!userID) return;

    fetch(
      `${BASE_API_URL}/api/PermitLeave/GetAllPermitLeavesByUserID/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPermitLeaves(data);
        } else {
          setPermitLeaves([]);
          console.warn("No permit leaves found:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching permit leaves:", err);
        setPermitLeaves([]);
      });
  }, [userID]);

  if (!permitLeaves || permitLeaves.length === 0) {
    return <LoadingOrError data={permitLeaves} />;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = permitLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(permitLeaves.length / rowsPerPage);
  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">سجل تصاريحي</h2>
        </div>
        <div className="ps-3">
          <button
            className="my-3 mx-1 btn btn-outline-primary d-flex justify-content-center align-items-center text-nowrap">
            <FontAwesomeIcon icon={faPrint} style={{ fontSize: "1.2em" }}/>
            <span className="d-none d-sm-inline">&nbsp;طباعة البيانات</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" className="th-mult">المرجع</th>
                <th scope="col" className="th-mult">الاسم</th>
                <th scope="col" className="th-mult">التاريخ</th>
                <th scope="col" className="th-mult">عدد الساعات</th>
                <th scope="col" className="th-mult">طباعة</th>
                <th scope="col" className="th-mult">الأرشيف</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((permit, index) => (
                  <tr key={index}>
                    <th>
                      #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                    </th>
                    <th>{permit.userName}</th>
                    <th>{new Date(permit.date).toLocaleDateString("ar-EG")}</th>
                    <th>
                      {permit.hours
                        .toString()
                        .replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit])}{" "}
                      ساعات
                    </th>
                    <th>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          MySwal.fire({
                          title: 'تقرير تصريحي',
                          html: <PermitReport permitID={permit.id} />,
                          showConfirmButton: false,
                          showCloseButton: true,
                          width: '95%',
                          customClass: {
                            popup: 'text-end custom-swal-width',
                          }})}>
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </th>
                    <th>
                      <BtnLink
                        id={permit.id}
                        name="عرض التصريح"
                        link="/permit-leave"
                        className="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger p-3">
                    لا يوجد تصاريح حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {permitLeaves.length > rowsPerPage && (
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

export default AgazatyPermit;
