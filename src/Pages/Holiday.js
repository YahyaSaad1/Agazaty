import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnLink from "../components/BtnLink";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";

function Holidays() {
  const [holidays, setHolidays] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Holiday/GetAllHolidays`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHolidays(data);
        } else if (Array.isArray(data.data)) {
          setHolidays(data.data);
        } else {
          console.error("Unexpected data format:", data);
          setHolidays([]);
        }
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من استعادة بيانات هذا الاجازة!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
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
      if (result.isConfirmed) {
        fetch(`${BASE_API_URL}/api/Holiday/DeleteHoliday/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            setHolidays(holidays.filter((holiday) => holiday.id !== id));
            Swal.fire({
              title: "تم الحذف!",
              text: "تم حذف الاجازة بنجاح.",
              icon: "success",
              confirmButtonText: "حسناً",
              customClass: {
                title: "text-blue",
                confirmButton: "blue-button",
                cancelButton: "red-button",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal2-popup");
                if (popup) popup.setAttribute("dir", "rtl");
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "خطأ!",
              text: "حدث خطأ أثناء حذف الاجازة.",
              icon: "error",
              confirmButtonText: "حسناً",
              customClass: {
                title: "text-blue",
                confirmButton: "blue-button",
                cancelButton: "red-button",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal2-popup");
                if (popup) popup.setAttribute("dir", "rtl");
              },
            });
          });
      }
    });
  };

  if (!holidays || holidays.length === 0) {
    return (
      <LoadingOrError
        data={holidays}
        btnTitle="إضافة اجازة رسمية"
        btnLink="/add-holiday"
      />
    );
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = holidays.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(holidays.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0" style={{ whiteSpace: "nowrap" }}>
            الاجازات الرسمية
          </h2>
        </div>
        <div className="p-3">
          <BtnLink
            name="إضافة اجازة رسمية"
            link="/add-holiday"
            class="btn btn-primary m-0 me-2"
          />
        </div>
      </div>
      <div className="row">
        <div style={{ height: "100vh", overflowY: "auto" }}>
          <table className="m-0 table table-striped">
            <thead className="sticky-top bg-white">
              <tr>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  المرجع
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  الاسم
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  التاريخ
                </th>
                <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                  المزيد
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 &&
                currentRows.map((holiday, index) => (
                  <tr>
                    <th style={{ height: "50px" }}>
                      #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                    </th>
                    <th style={{ height: "50px" }}>{holiday.name}</th>
                    <th>
                      {new Date(holiday.date).toLocaleDateString("ar-EG")}
                    </th>
                    <th style={{ height: "50px" }}>
                      <Link to={`/holiday/edit/${holiday.id}`}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          color="blue"
                          className="fontt"
                        />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="red"
                        className="fontt"
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                        onClick={() => handleDelete(holiday.id)}
                      />
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
          {holidays.length > rowsPerPage && (
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

export default Holidays;
