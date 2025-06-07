import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";

function DesNormal() {
  const [leaves, setLeaves] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/NormalLeave/GetAllNormalLeaves`, {
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
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaves(data);
        } else {
          setLeaves([]);
          console.warn("Expected an array, but got:", data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLeaves([]);
      });
  }, []);

  if (!leaves || leaves.length === 0) {
    return <LoadingOrError data={leaves} />;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = leaves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(leaves.length / rowsPerPage);
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
        <div className="table-responsive" style={{ height: "100vh" }}>
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  المرجع
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الاسم
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  تاريخ البدء
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  تاريخ الانتهاء
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  عدد الأيام
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  القائم بالعمل
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  ملحوظات
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  حالة الطلب
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  طباعة
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الأرشيف
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 &&
                currentRows.map((leave, index) => (
                  <tr key={index}>
                    <th>
                      #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                    </th>
                    <th>{leave.userName}</th>
                    <th>
                      {new Date(leave.startDate).toLocaleDateString("ar-EG")}
                    </th>
                    <th>
                      {new Date(leave.endDate).toLocaleDateString("ar-EG")}
                    </th>
                    <th>
                      {leave.days
                        .toString()
                        .replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit])}{" "}
                      أيام
                    </th>
                    <th>{leave.coworkerName}</th>
                    <th>{leave.notesFromEmployee || "بدون"}</th>
                    {leave.leaveStatus === 0 ? (
                      <th className="text-primary">معلقة</th>
                    ) : leave.leaveStatus === 1 ? (
                      <th className="text-success">مقبولة</th>
                    ) : (
                      <th className="text-danger">مرفوضة</th>
                    )}
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
                        link="/normal-leave-request"
                        class="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
          {leaves.length > rowsPerPage && (
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

export default DesNormal;
