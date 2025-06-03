import { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";

function SickLeavesRecord() {
  const [sickLeavesWaiting, setSickLeavesWaiting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

 useEffect(() => {
  const fetchSickLeaves = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/SickLeave/GetAllSickLeave`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // إضافة التوكن هنا
        },
      });

      const data = await response.json();
      setSickLeavesWaiting(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sick leaves:", error);
    }
  };

  fetchSickLeaves();
}, [token]);  // أضفنا التوكن كاعتماد داخل الـ useEffect


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sickLeavesWaiting.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sickLeavesWaiting.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">الاجازات المرضية</h2>
        </div>
      </div>

      <div className="row">
        <div>
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
                  تاريخ الاخطار
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  العنوان
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  حالة الطلب
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  حالة المرض
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الأرشيف
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((leave, index) => (
                  <tr key={index}>
                    <td>#{leave.id}</td>
                    <td>{leave.userName}</td>
                    <td>{new Date(leave.requestDate).toLocaleDateString()}</td>
                    <td>
                      {leave.governorate} - {leave.state} - {leave.street}
                    </td>
                    <td>
                      {leave.certified === true &&
                      leave.responseDoneFinal === true ? (
                        <span className="text-success">محتسبة</span>
                      ) : leave.certified === false &&
                        leave.responseDoneFinal === true ? (
                        <span className="text-danger">غير محتسبة</span>
                      ) : (
                        <span className="text-danger">معلقة</span>
                      )}
                    </td>
                    <td>
                      {leave.chronic === true &&
                      leave.responseDoneFinal === true ? (
                        "مزمن"
                      ) : leave.chronic === false &&
                        leave.responseDoneFinal === true ? (
                        "غير مزمن"
                      ) : (
                        <span className="text-danger">لم يتم التحديد</span>
                      )}
                    </td>
                    <td>
                      <BtnLink
                        id={leave.id}
                        name="تفاصيل الاخطار"
                        link="/sick-leave-request"
                        class="btn btn-outline-primary"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-danger p-3">
                    لا يوجد اجازات حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {sickLeavesWaiting.length > rowsPerPage && (
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

                  {/* Next Button */}
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

export default SickLeavesRecord;
