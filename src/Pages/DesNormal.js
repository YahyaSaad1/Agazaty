import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DesNormalReport from "../components/DesNormalReport";
import NormalReport from "./NormalReport";

function DesNormal() {
  const [leaves, setLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllNormalLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setLeaves(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Fetch error:", error);
        setLeaves([]);
      });
  }, []);

  const handleGeneralReportClick = () => {
    MySwal.fire({
      title: "اختر حالة الإجازات",
      input: "radio",
      inputOptions: new Map([
        ["3", "الكل"],
        ["2", "المرفوضة"],
        ["1", "المقبولة"],
        ["0", "المُعلقة"],
      ]),
      inputValidator: (value) => !value && "يجب اختيار حالة لعرض التقرير",
      confirmButtonText: "عرض التقرير",
      cancelButtonText: "إلغاء",
      showCancelButton: true,
      customClass: {
        title: "text-blue",
        confirmButton: "blue-button",
        cancelButton: "red-button",
      },
      didOpen: () => {
        const popup = document.querySelector(".swal2-popup");
        if (popup) popup.setAttribute("dir", "rtl");
      },
    }).then((result) => {
      if (!result.isConfirmed) return;

      const status = Number(result.value);
      const statusLabel =
        status === 3 ? "الكل"
        : status === 2 ? "المرفوضة"
        : status === 1 ? "المقبولة"
        : "المُعلقة";

      MySwal.fire({
        title: `تقرير الإجازات ${statusLabel}`,
        html: <DesNormalReport status={status} />,
        showConfirmButton: false,
        showCloseButton: true,
        width: "95%",
        customClass: { popup: "text-end custom-swal-width" },
      });
    });
  };

  if (!leaves || leaves.length === 0) return <LoadingOrError data={leaves} />;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = leaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(leaves.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">سجل الإجازات الاعتيادية</h2>
        </div>

        <div className="p-3 pe-0">
          <button
            className="btn btn-outline-primary"
            onClick={handleGeneralReportClick}
          >
            <FontAwesomeIcon icon={faPrint} />
            <span className="d-none d-sm-inline"> طباعة البيانات</span>
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
                <th scope="col" className="th-mult">تاريخ البدء</th>
                <th scope="col" className="th-mult">تاريخ الانتهاء</th>
                <th scope="col" className="th-mult">عدد الأيام</th>
                <th scope="col" className="th-mult">القائم بالعمل</th>
                <th scope="col" className="th-mult">ملحوظات</th>
                <th scope="col" className="th-mult">حالة الطلب</th>
                <th scope="col" className="th-mult">طباعة</th>
                <th scope="col" className="th-mult">الأرشيف</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((leave, index) => (
                <tr key={index}>
                  <th>#{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}</th>
                  <th>{leave.userName}</th>
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
                  {leave.leaveStatus === 0 ? (
                    <th className="text-primary">مُعلقة</th>
                  ) : leave.leaveStatus === 1 ? (
                    <th className="text-success">مقبولة</th>
                  ) : (
                    <th className="text-danger">مرفوضة</th>
                  )}

                  {/* طباعة إجازة فردية */}
                  <th>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        MySwal.fire({
                          title: "تقرير الإجازة",
                          html: <NormalReport leaveID={leave.id} />,
                          showConfirmButton: false,
                          showCloseButton: true,
                          width: "95%",
                          customClass: { popup: "text-end custom-swal-width" },
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                  </th>

                  {/* زر الأرشيف */}
                  <th>
                    <BtnLink
                      id={leave.id}
                      name="عرض الاجازة"
                      link="/request/normal-leave"
                      className="btn btn-outline-primary"
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ترقيم الصفحات */}
          {leaves.length > rowsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button
                      className="page-link"
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    >
                      السابق
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 && "active"}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${currentPage === totalPages && "disabled"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        currentPage < totalPages && setCurrentPage(currentPage + 1)
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

export default DesNormal;
