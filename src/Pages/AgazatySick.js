import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import SickReport from "../components/SickReport";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AgazatySick() {
  const [sickLeaves, setSickLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchSickLeaves = async () => {
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/SickLeave/GetAllSickLeavesByUserID/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSickLeaves(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching sick leaves:", error);
        setSickLeaves([]);
      }
    };

    fetchSickLeaves();
  }, []);

  if (!sickLeaves || sickLeaves.length === 0) {
    return <LoadingOrError data={sickLeaves} />;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sickLeaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sickLeaves.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">سجل إجازاتي المرضية</h2>
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
                <th scope="col" className="th-mult">تاريخ البدء</th>
                <th scope="col" className="th-mult">تاريخ الانتهاء</th>
                <th scope="col" className="th-mult">عدد الأيام</th>
                <th scope="col" className="th-mult">حالة الطلب</th>
                <th scope="col" className="th-mult">طباعة</th>
                <th scope="col" className="th-mult">الأرشيف</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((leave, index) => (
                  <tr key={index}>
                    <th>
                      #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                    </th>
                    {leave.startDate === "0001-01-01T00:00:00" ? (
                      <th className="text-danger">لم يُحدد بعد</th>
                    ) : (
                      <th>
                        {new Date(leave.startDate).toLocaleDateString("ar-EG")}
                      </th>
                    )}

                    {leave.endDate === "0001-01-01T00:00:00" ? (
                      <th className="text-danger">لم يُحدد بعد</th>
                    ) : (
                      <th>
                        {new Date(leave.endDate).toLocaleDateString("ar-EG")}
                      </th>
                    )}

                    {leave.days === null ? (
                      <th className="text-danger">لم يُحتسب بعد</th>
                    ) : (
                      <th>
                        {leave.days
                          .toString()
                          .replace(
                            /[0-9]/g,
                            (digit) => "٠١٢٣٤٥٦٧٨٩"[digit]
                          )}{" "}
                        أيام
                      </th>
                    )}
                    <th>
                      {leave.certified === true ? (
                        <th className="text-success">مُستحقة</th>
                      ) : leave.responseDoneFinal === false &&
                        leave.respononseDoneForMedicalCommitte === false ? (
                        <th className="text-primary">
                          مُعلقة عند التحديث الأول
                        </th>
                      ) : leave.responseDoneFinal === false &&
                        leave.respononseDoneForMedicalCommitte === true ? (
                        <th className="text-primary">
                          مُعلقة عند التحديث الثاني
                        </th>
                      ) : (
                        <th className="text-danger">غير مُستحقة</th>
                      )}
                    </th>
                    <th>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          MySwal.fire({
                          title: 'تقرير إجازتي المرضية',
                          html: <SickReport leaveID={leave.id} />,
                          showConfirmButton: false,
                          showCloseButton: true,
                          width: '95%',
                          customClass: {
                            popup: 'text-end custom-swal-width',
                          }})}>
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </th>
                    <td>
                      <BtnLink
                        id={leave.id}
                        name="عرض الاجازة"
                        link="/agazaty/sick-leave-request"
                        className="btn btn-outline-primary"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-danger p-3">
                    لا يوجد اجازات مرضية حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {sickLeaves.length > rowsPerPage && (
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

export default AgazatySick;
