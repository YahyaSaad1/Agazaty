import React, { useEffect, useState, useMemo } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DesNormalReport from "../components/DesNormalReport";
import NormalReport from "./NormalReport";

const MySwal = withReactContent(Swal);

function DesNormal() {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllNormalLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setLeaves(Array.isArray(data) ? data : []))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          setLeaves([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const totalPages = useMemo(() => Math.ceil(leaves.length / rowsPerPage), [leaves.length]);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return leaves.slice(start, start + rowsPerPage);
  }, [currentPage, leaves]);

  const handleGeneralReportClick = () => {
  MySwal.fire({
    title: "اختر حالة الإجازات",
    input: "radio",
    inputOptions: new Map([
      ["3", "الكل"],
      ["1", "المقبولة"],
      ["2", "المرفوضة"],
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
      document.querySelector(".swal2-popup")?.setAttribute("dir", "rtl");
    },
  }).then((result) => {
    if (!result.isConfirmed) return;

    const status = Number(result.value);

    const statusLabel =
      status === 2 ? "المرفوضة"
      : status === 1 ? "المقبولة"
      : status === 0 ? "المُعلقة"
      : "الكل";

    const reportTitle =
      status === 3
        ? "تقرير لكل الإجازات الاعتيادية"
        : `تقرير الإجازات الاعتيادية ${statusLabel}`;

    MySwal.fire({
      title: reportTitle,
      html: <DesNormalReport status={status} />,
      showConfirmButton: false,
      showCloseButton: true,
      width: "95%",
      customClass: { popup: "text-end custom-swal-width" },
    });
  });
};


  if (loading || !leaves.length) return <LoadingOrError data={leaves} />;

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">سجل الإجازات الاعتيادية</h2>
        </div>

        <div className="p-3 pe-0">
          <button className="btn btn-outline-primary" onClick={handleGeneralReportClick}>
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
                  <th>#{(currentPage - 1) * rowsPerPage + index + 1}</th>
                  <th>{leave.userName}</th>
                  <th>{new Date(leave.startDate).toLocaleDateString("ar-EG")}</th>
                  <th>{new Date(leave.endDate).toLocaleDateString("ar-EG")}</th>
                  <th>
                    {leave.days
                      .toString()
                      .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])} أيام
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
                    {leave.leaveStatus === 0
                      ? "مُعلقة"
                      : leave.leaveStatus === 1
                      ? "مقبولة"
                      : "مرفوضة"}
                  </th>
                  <th>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        MySwal.fire({
                          title: `تقرير إجازة ${leave.firstName} ${leave.secondName}`,
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

          {leaves.length > rowsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                      السابق
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
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
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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