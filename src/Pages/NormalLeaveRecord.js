import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, rowsPerPage, token, userID } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";

function NormalLeaveRecord() {
  const [leavesWating, setLeavesWating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const urls = [
          `${BASE_API_URL}/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`,
          `${BASE_API_URL}/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`,
        ];

        const requests = urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
          })
        );

        const results = await Promise.allSettled(requests);

        const combinedData = results.reduce((acc, result) => {
          if (result.status === "fulfilled" && Array.isArray(result.value)) {
            acc = acc.concat(result.value);
          }
          return acc;
        }, []);

        setLeavesWating(combinedData);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        setLeavesWating([]);
      }
    };

    fetchLeaves();
  }, []);

  if (!leavesWating || leavesWating.length === 0) {
    return <LoadingOrError data={leavesWating} />;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = leavesWating.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(leavesWating.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0 text-nowrap">طلبات الإجازات الاعتيادية</h2>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="m-0 table table-striped">
            <thead>
              <tr>
                <th scope="col" className="th-mult">المرجع</th>
                <th scope="col" className="th-mult">الاسم</th>
                <th scope="col" className="th-mult">القسم</th>
                <th scope="col" className="th-mult">رقم الهاتف</th>
                <th scope="col" className="th-mult">نوع الإجازة</th>
                <th scope="col" className="th-mult">تاريخ البداية</th>
                <th scope="col" className="th-mult">تاريخ النهاية</th>
                <th scope="col" className="th-mult">عدد الأيام</th>
                <th scope="col" className="th-mult">حالة الطلب</th>
                <th scope="col" className="th-mult">الأرشيف</th>
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
                    <th>{leave.departmentName}</th>
                    <th>{leave.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</th>
                    <th>اعتيادية</th>
                    <th>
                      {leave.endDate
                        ? new Date(leave.startDate).toLocaleDateString("ar-EG")
                        : "-"}
                    </th>
                    <th>
                      {leave.endDate
                        ? new Date(leave.endDate).toLocaleDateString("ar-EG")
                        : "-"}
                    </th>

                    <th>
                      {leave.days ? leave.days.toLocaleString("ar-EG") : "0"}{" "}
                      أيام
                    </th>
                    <th
                      className={
                        leave.leaveStatus === 0 ? "text-primary" : "text-success"
                      }
                    >
                      {leave.leaveStatus === 0 ? "مُعلقة" : "مقبولة"}
                    </th>
                    <th>
                      <BtnLink
                        id={leave.id}
                        name="عرض الإجازة"
                        link="/manager-normal-leave-request"
                        className="btn btn-outline-primary"
                      />
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
          {leavesWating.length > rowsPerPage && (
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

export default NormalLeaveRecord;
