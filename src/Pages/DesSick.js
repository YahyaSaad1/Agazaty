import React, { useEffect, useState, useMemo, useCallback } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SickReport from "../components/SickReport";
import DesSickReport from "../components/DesSickReport";

const MySwal = withReactContent(Swal);

function DesSick() {
  const [sickLeaves, setSickLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSickLeaves() {
      try {
        const res = await fetch(`${BASE_API_URL}/api/SickLeave/GetAllSickLeave`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data = await res.json();
        setSickLeaves(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching sick leaves:", err);
          setSickLeaves([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSickLeaves();
    return () => controller.abort();
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(sickLeaves.length / rowsPerPage),
    [sickLeaves.length]
  );

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sickLeaves.slice(start, start + rowsPerPage);
  }, [currentPage, sickLeaves]);

  const formatDate = (dateStr) =>
    dateStr === "0001-01-01T00:00:00"
      ? <span className="text-danger">لم يُحدد بعد</span>
      : new Intl.DateTimeFormat("ar-EG").format(new Date(dateStr));

  const formatDays = (days) =>
    days === null
      ? <span className="text-danger">لم يُحتسب بعد</span>
      : `${days.toLocaleString("ar-EG")} أيام`;

  const getStatusLabel = useCallback((leave) => {
    if (leave.certified) return { label: "مُستحقة", className: "text-success" };
    if (!leave.responseDoneFinal && !leave.respononseDoneForMedicalCommitte)
      return { label: "مُعلقة عند التحديث الأول", className: "text-primary" };
    if (!leave.responseDoneFinal && leave.respononseDoneForMedicalCommitte)
      return { label: "مُعلقة عند التحديث الثاني", className: "text-primary" };
    return { label: "غير مُستحقة", className: "text-danger" };
  }, []);

  const handleGeneralReportClick = () => {
    MySwal.fire({
      title: "اختر حالة الإجازات",
      input: "radio",
      inputOptions: new Map([
        ["3", "الكل"],
        ["0", "المُعلقة"],
        ["1", "المُستحقة"],
        ["2", "الغير مُستحقة"],
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
    }).then(({ isConfirmed, value }) => {
      if (!isConfirmed) return;
      const status = Number(value);
      const statusLabel =
        status === 0 ? "المُعلقة" : status === 1 ? "المُستحقة" : status === 2 ? "الغير مُستحقة" : "الكل";

      MySwal.fire({
        title: `تقرير الإجازات ${statusLabel}`,
        html: <DesSickReport status={status} />,
        showConfirmButton: false,
        showCloseButton: true,
        width: "95%",
        customClass: { popup: "text-end custom-swal-width" },
      });
    });
  };

  if (loading) return <LoadingOrError data={null} />;
  if (!sickLeaves.length) return <LoadingOrError data={[]} />;

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">سجل الإجازات المرضية</h2>
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
                <th scope="col" className="th-mult">حالة الطلب</th>
                <th scope="col" className="th-mult">طباعة</th>
                <th scope="col" className="th-mult">الأرشيف</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length ? (
                currentRows.map((leave, idx) => {
                  const { label, className } = getStatusLabel(leave);
                  return (
                    <tr key={leave.id}>
                      <th>
                        #{((currentPage - 1) * rowsPerPage + idx + 1).toLocaleString("ar-EG")}
                      </th>
                      <th>{leave.userName}</th>
                      <th>{formatDate(leave.startDate)}</th>
                      <th>{formatDate(leave.endDate)}</th>
                      <th>{formatDays(leave.days)}</th>
                      <th className={className}>{label}</th>
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            MySwal.fire({
                              title: `تقرير إجازة ${leave.firstName} ${leave.secondName}`,
                              html: <SickReport leaveID={leave.id} />,
                              showConfirmButton: false,
                              showCloseButton: true,
                              width: "95%",
                              customClass: { popup: "text-end custom-swal-width" },
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </button>
                      </td>
                      <td>
                        <BtnLink
                          id={leave.id}
                          name="عرض الاجازة"
                          link="/sick-leave-request"
                          className="btn btn-outline-primary"
                        />
                      </td>
                    </tr>
                  );
                })
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
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                      السابق
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
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

export default DesSick;