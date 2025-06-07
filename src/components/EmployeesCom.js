import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import BtnLink from "../components/BtnLink";
import "../CSS/Employee.css";
import {
  faIdCard,
  faPenToSquare,
  faTable,
  faUserPen,
  faUserPlus,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_API_URL, roleName, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "./LoadingOrError";

function EmployeesCom({ type }) {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [searchQuery]);

  const fetchEmployees = () => {
    const url =
      type === "active"
        ? `${BASE_API_URL}/api/Account/GetAllActiveUsers`
        : `${BASE_API_URL}/api/Account/GetAllNonActiveUsers`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) =>
          [
            user.fullName,
            user.nationalID,
            user.roleName,
            user.phoneNumber,
            user.departmentName,
          ].some((field) =>
            field?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setUsers(filteredUsers);
      })
      .catch(() => setUsers([]));
  };

  const softDeleteUser = (userId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم أرشفة الموظف ولن يكون مرئيًا في القائمة!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، أرشفة!",
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
        fetch(`${BASE_API_URL}/api/Account/SoftDeleteUser/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.message || "خطأ في الأرشفة");
            }
            fetchEmployees();
            Swal.fire({
              title: "تم الأرشفة!",
              text: "تم أرشفة الموظف بنجاح.",
              icon: "success",
              confirmButtonText: "حسنًا",
              customClass: {
                title: "text-blue",
                confirmButton: "blue-button",
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
              text: error.message,
              confirmButtonText: "حسناً",
              icon: "error",
              customClass: {
                title: "text-blue",
                confirmButton: "blue-button",
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

  const ReActiveUser = (userId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: `سيتم إلغاء أرشفة الموظف وسيكون مرئيًا في القائمة!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، إلغاء الأرشفة!",
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
        fetch(`${BASE_API_URL}/api/Account/ReActiveUser/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(
                  `خطأ في إلغاء الأرشفة: ${text || response.status}`
                );
              });
            }
            return response.json();
          })
          .then(() => {
            Swal.fire({
              title: "تم إلغاء الأرشفة بنجاح.",
              icon: "success",
              confirmButtonText: "حسنًا",
              customClass: {
                title: "text-blue",
                confirmButton: "blue-button",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal2-popup");
                if (popup) popup.setAttribute("dir", "rtl");
              },
            });

            fetchEmployees();
          })
          .catch((error) => {
            Swal.fire({
              title: `خطأ! حدث خطأ أثناء إلغاء أرشفة الموظف: ${error.message}`,
              icon: "error",
              confirmButtonText: "حسنًا",
              customClass: {
                title: "text-red",
                confirmButton: "blue-button",
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

  const downloadActiveUsersExcel = async () => {
    try {
      const urll =
        type === "active"
          ? `${BASE_API_URL}/api/Account/export-active-users-excel`
          : `${BASE_API_URL}/api/Account/export-nonactive-users-excel`;
      const response = await fetch(urll, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        type === "active"
          ? "الموظفين النشطين.xlsx"
          : "الموظفين غير النشطين.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };

  if (!users) {
    return (
      <LoadingOrError
        data={users}
        btnTitle={type === "active" ? "إضافة موظف" : "الموظفين النشطين"}
        btnLink={type === "active" ? "/add-employee" : "/employees/active"}
      />
    );
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-flex p-3 ps-5 justify-content-center align-items-center">
          {type === "active" ? (
            <h2 className="m-0">الموظفيين</h2>
          ) : (
            <h2 className="m-0">الموظفين الغير نشطين</h2>
          )}
        </div>

        {(roleName === "مدير الموارد البشرية" ||
          roleName === "عميد الكلية") && (
          <div className="d-flex">
            <button
              onClick={downloadActiveUsersExcel}
              className="my-3 mx-1 btn btn-success d-flex justify-content-center align-items-center"
              style={{ whiteSpace: "nowrap" }}
            >
              <FontAwesomeIcon
                icon={faTable}
                style={{ fontSize: "1.4rem" }}
                color="#fff"
                className="ms-2"
              />
              <span>تنزيل البيانات</span>
            </button>

            {type === "active" ? (
              <BtnLink
                name="إضافة موظف"
                link="/add-employee"
                class="my-3 mx-2 btn btn-primary m-0"
              />
            ) : (
              <BtnLink
                name="الموظفين النشطين"
                link="/employees/active"
                class="my-3 mx-2 btn btn-primary m-0"
              />
            )}
          </div>
        )}
      </div>

      <div className="mb-4 me-3">
        <input
          type="text"
          placeholder="بحث عن موظف ..."
          className="form-control w-75"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        <div>
          <div className="table-responsive">
            <table className="m-0 table table-striped">
              <thead>
                <tr>
                  <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                    المرجع
                  </th>
                  <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                    الاسم
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#F5F9FF", whiteSpace: "nowrap" }}
                  >
                    المسمى الوظيفي
                  </th>
                  <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                    القسم
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#F5F9FF", whiteSpace: "nowrap" }}
                  >
                    تاريخ التعيين
                  </th>
                  <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                    رقم الهاتف
                  </th>
                  <th scope="col" style={{ backgroundColor: "#F5F9FF" }}>
                    المزيد
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 &&
                  currentRows.map((user, index) => (
                    <tr key={index}>
                      <th>
                        #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                      </th>
                      <td style={{ height: "50px" }}>{user.fullName}</td>
                      <td style={{ height: "50px" }}>{user.roleName}</td>
                      <td style={{ height: "50px" }}>
                        {user.departmentName || "--"}
                      </td>
                      <td style={{ height: "50px" }}>
                        {new Date(user.hireDate).toLocaleDateString("ar-EG")}
                      </td>
                      <td style={{ height: "50px" }}>{user.phoneNumber}</td>
                      {type === "active" ? (
                        <td style={{ height: "50px" }}>
                          <Link
                            to={`/profile/user/${user.id}`}
                            className="ms-1"
                          >
                            <FontAwesomeIcon
                              icon={faIdCard}
                              color="green"
                              className="fontt"
                            />
                          </Link>
                          <Link to={`/employee/${user.id}`} className="ms-1">
                            <FontAwesomeIcon
                              icon={faUserPen}
                              color="blue"
                              className="fontt"
                            />
                          </Link>
                          <FontAwesomeIcon
                            icon={faUserSlash}
                            onClick={() => softDeleteUser(user.id)}
                            color="red"
                            className="fontt"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                          />
                        </td>
                      ) : (
                        <td style={{ height: "50px" }}>
                          <Link
                            to={`/profile/user/${user.id}`}
                            className="ms-1"
                          >
                            <FontAwesomeIcon
                              icon={faIdCard}
                              color="green"
                              className="fontt"
                            />
                          </Link>
                          <Link to={`/employee/${user.id}/edit`}>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              color="blue"
                              className="fontt"
                            />
                          </Link>
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            color="#17a2b8"
                            onClick={() => ReActiveUser(user.id)}
                            className="fontt"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {users.length > rowsPerPage && (
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

export default EmployeesCom;
