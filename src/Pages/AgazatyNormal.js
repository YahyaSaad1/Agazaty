import React, { useState, useEffect } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import { FaRegFolderOpen } from "react-icons/fa";
import LoadingOrError from "../components/LoadingOrError";
function AgazatyNormal() {
  const [normalLeaves, setNormalLeaves] = useState(null); // null معناها جاري التحميل
  const [currentPage, setCurrentPage] = useState(1);

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
        setNormalLeaves([]); // تعويض بالصفوف الفارغة لو فيه خطأ
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
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0" style={{ whiteSpace: "nowrap" }}>
            سجل الاجازات الاعتيادية
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#F5F9FF" }}>المرجع</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>تاريخ البدء</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>تاريخ الانتهاء</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>عدد الأيام</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>القائم بالعمل</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>ملحوظات</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>حالة الطلب</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>طباعة</th>
                <th style={{ backgroundColor: "#F5F9FF" }}>الأرشيف</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((leave, index) => (
                <tr key={index}>
                  <th>
                    #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                  </th>
                  <th>
                    {new Date(leave.startDate).toLocaleDateString("ar-EG")}
                  </th>
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
                    {leave.leaveStatus === 0
                      ? "معلقة"
                      : leave.leaveStatus === 1
                      ? "مقبولة"
                      : "مرفوضة"}
                  </th>
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
                      name="عرض الاجازة"
                      link="/user/normal-leave-request"
                      class="btn btn-outline-primary"
                    />
                  </th>
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
