import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_API_URL, token } from "../server/serves";

function EditEmployeeForHR() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});
  const [departments, setDepartments] = useState([]);
  const [yearsOfWork, setYearsOfWork] = useState(0);
  const [monthsOfWork, setMonthsOfWork] = useState(0);
  const [position, setPosition] = useState("");
  const [departement_ID, setDepartement_ID] = useState(null);

  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Role/GetAllRoles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err)); // معالجة الأخطاء
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Department/GetAllDepartments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err)); // معالجة الأخطاء
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Account/GetUserById/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);
  const hireYear = new Date(user.hireDate).getFullYear();
  const calculateYearsOfWork = (hireDate) => {
    if (!hireDate) return 0;
    const today = new Date();
    const hireDateObj = new Date(hireDate);
    let years = 0;
    for (
      let year = hireDateObj.getFullYear();
      year <= today.getFullYear();
      year++
    ) {
      const firstJuly = new Date(year, 6, 1);
      if (firstJuly >= hireDateObj && firstJuly <= today) {
        years++;
      }
    }
    setYearsOfWork(years);
  };
  useEffect(() => {
    if (user.hireDate) calculateYearsOfWork(user.hireDate);
  }, [user.hireDate]);
  const getMonths = (hireDate) => {
    const start = new Date(hireDate);
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12;
    months += now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) {
      months--;
    }
    return months >= 0 ? months : 0;
  };

  useEffect(() => {
    setMonthsOfWork(getMonths(user.hireDate));
  }, [user.hireDate]);

  const [age, setAge] = useState(0);
  const getAge = (dateOfBirth) => {
    const dateeOfBirth = new Date(dateOfBirth);
    const todayy = new Date();

    let yearsDiff = todayy.getFullYear() - dateeOfBirth.getFullYear();
    let monthsDiff = todayy.getMonth() - dateeOfBirth.getMonth();
    let daysDiff = todayy.getDate() - dateeOfBirth.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
    }
    return yearsDiff;
  };
  const getDeptNameById = (id) => {
    return departments.find((dept) => dept.id === id)?.name ?? "";
  };
  useEffect(() => {
    setAge(getAge(user.dateOfBirth));
  }, [user.dateOfBirth]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "roleName" && value === "موظف") ||
      (name === "roleName" && value === "هيئة تدريس")
    ) {
      setPosition("");
      setDepartement_ID("");
      setUpdatedFields((prev) => ({
        ...prev,
        [name]: value || user[name],
        position: "",
      }));
      return;
    }

    setUpdatedFields((prev) => ({
      ...prev,
      [name]: value || user[name],
    }));
  };
  const getFilteredDepartments = () => {
    const selectedRole = updatedFields.roleName ?? user.roleName;
    if (selectedRole === "هيئة تدريس") {
      return departments.filter(
        (department) => department.departmentType === true
      );
    } else if (selectedRole === "موظف") {
      return departments.filter(
        (department) => department.departmentType === false
      );
    }
    return [];
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedDeptID =
    departement_ID ??
    departments.find((d) => d.name === user.departmentName)?.id;

  const finalData = {
    firstName: updatedFields.firstName || user.firstName,
    secondName: updatedFields.secondName || user.secondName,
    thirdName: updatedFields.thirdName || user.thirdName,
    forthName: updatedFields.forthName || user.forthName,
    userName: updatedFields.userName || user.userName,
    nationalID: updatedFields.nationalID || user.nationalID,
    hireDate: updatedFields.hireDate || user.hireDate,
    email: updatedFields.email || user.email,
    phoneNumber: updatedFields.phoneNumber || user.phoneNumber,
    gender: updatedFields.gender || user.gender,
    dateOfBirth: updatedFields.dateOfBirth || user.dateOfBirth,
    position: updatedFields.position || user.position,
    normalLeavesCount: updatedFields.normalLeavesCount || user.normalLeavesCount,
    casualLeavesCount: updatedFields.casualLeavesCount || user.casualLeavesCount,
    nonChronicSickLeavesCount:
      updatedFields.nonChronicSickLeavesCount || user.nonChronicSickLeavesCount,
    departement_ID: selectedDeptID,
    normalLeavesCount_47: updatedFields.normalLeavesCount_47 || user.normalLeavesCount_47,
    normalLeavesCount_81Before3Years:
      updatedFields.normalLeavesCount_81Before3Years || user.normalLeavesCount_81Before3Years,
    normalLeavesCount_81Before2Years:
      updatedFields.normalLeavesCount_81Before2Years || user.normalLeavesCount_81Before2Years,
    normalLeavesCount_81Before1Years:
      updatedFields.normalLeavesCount_81Before1Years || user.normalLeavesCount_81Before1Years,
    howManyDaysFrom81And47:
      updatedFields.howManyDaysFrom81And47 || user.howManyDaysFrom81And47,
    roleName: updatedFields.roleName || user.roleName,
    disability:
      updatedFields.disability === "true"
        ? true
        : updatedFields.disability === "false"
        ? false
        : user.disability,
    governorate: updatedFields.governorate || user.governorate,
    state: updatedFields.state || user.state,
    street: updatedFields.street || user.street,
  };

  const noChanges = Object.entries(finalData).every(([key, value]) => {
    const original = user[key];
    if (key === "departement_ID") {
      const selectedName = getDeptNameById(value);
      return selectedName === user.departmentName;
    }
    return value === original;
  });

  if (noChanges) {
    Swal.fire({
      title: "!لم تقم بتعديل أي بيانات",
      icon: "info",
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
    return;
  }

  Swal.fire({
    title: `<span style='color:#0d6efd;'>هل أنت متأكد من تحديث البيانات؟</span>`,
    text: "لا يمكن التراجع عن هذا الإجراء!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم، تحديث",
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${BASE_API_URL}/api/Account/UpdateUser/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(finalData),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: `<span style='color:#0d6efd;'>تم تحديث بيانات ${user.firstName} ${user.secondName} بنجاح.</span>`,
            icon: "success",
            confirmButtonText: "حسنًا",
            confirmButtonColor: "#0d6efd",
            customClass: {
              title: "text-blue",
              confirmButton: "blue-button",
            },
            didOpen: () => {
              const popup = document.querySelector(".swal2-popup");
              if (popup) popup.setAttribute("dir", "rtl");
            },
          }).then(() => navigate("/employees/active"));
        } else {
          const errorData = await response.json();
          if (errorData) {
            const validationMessages = Object.values(errorData.errors || { message: errorData.message })
              .flat()
              .map((msg) => `<p>${msg || errorData.message}</p>`)
              .join("");
            Swal.fire({
              title: "فشل التحديث",
              html: `${validationMessages || errorData.message}`,
              icon: "error",
              confirmButtonText: "حسناً",
              customClass: {
                title: "text-red",
                confirmButton: "blue-button",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal2-popup");
                if (popup) popup.setAttribute("dir", "rtl");
              },
            });
          } else {
            Swal.fire({
              title: "حدث خطأ!",
              text: "لم يتم تحديث البيانات، حاول مرة أخرى.",
              icon: "error",
              confirmButtonText: "حسناً",
              customClass: {
                title: "text-red",
                confirmButton: "blue-button",
              },
              didOpen: () => {
                const popup = document.querySelector(".swal2-popup");
                if (popup) popup.setAttribute("dir", "rtl");
              },
            });
          }
        }
      } catch (error) {
        console.error("خطأ أثناء تحديث البيانات:", error);
        Swal.fire({
          title: "خطأ في الاتصال!",
          text: "تأكد من تشغيل السيرفر وحاول مجدداً.",
          icon: "error",
          customClass: {
            title: "text-red",
            confirmButton: "blue-button",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
          },
        });
      }
    }
  });
};

  
  return (
    <div>
      <div className="d-flex mb-3 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0">
            تعديل بيانات {user.firstName} {user.secondName}
          </h2>
        </div>
      </div>

      <form className="row" onSubmit={handleSubmit}>
        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDeputy0" className="form-label">
            الشخص ذو إعاقة
          </label>
          <select
            className="form-select"
            id="exampleInputDeputy0"
            name="disability"
            aria-label="Default select example"
            onChange={handleChange}
            value={updatedFields.disability ?? user.disability ?? ""}
          >
            <option value="" disabled selected>
              اختر
            </option>
            <option value={false}>لا</option>
            <option value={true}>نعم</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDeputy4" className="form-label">
            المنصب
          </label>
          <select
            className="form-select"
            id="exampleInputDeputy4"
            name="roleName"
            aria-label="Default select example"
            onChange={handleChange}
            value={updatedFields.roleName ?? user.roleName}
          >
            <option value="" disabled selected>
              اختر منصبًا
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDeputy3" className="form-label">
            الجنس
          </label>
          <select
            className="form-select"
            id="exampleInputDeputy3"
            name="gender"
            aria-label="Default select example"
            onChange={handleChange}
            value={updatedFields.gender ?? user.gender ?? ""}
          >
            <option value="" disabled selected>
              اختر الجنس
            </option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText1" className="form-label">
            الاسم الأول
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText1"
            name="firstName"
            aria-label="default input example"
            defaultValue={updatedFields.firstName ?? user.firstName}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText2" className="form-label">
            الاسم الثاني
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText2"
            name="secondName"
            aria-label="default input example"
            defaultValue={updatedFields.secondName ?? user.secondName}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText3" className="form-label">
            الاسم الثالث
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText3"
            name="thirdName"
            aria-label="default input example"
            defaultValue={updatedFields.thirdName ?? user.thirdName}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText4" className="form-label">
            الاسم الرابع
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText4"
            name="forthName"
            aria-label="default input example"
            defaultValue={updatedFields.forthName ?? user.forthName}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText0" className="form-label">
            اسم المستخدم
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            placeholder="مثال: yahyasaad"
            id="exampleFormControlText0"
            name="userName"
            aria-label="default input example"
            defaultValue={updatedFields.userName ?? user.userName}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber1" className="form-label">
            الرقم القومي
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            id="exampleFormControlNumber1"
            name="nationalID"
            aria-label="default input example"
            dir="rtl"
            defaultValue={updatedFields.nationalID ?? user.nationalID}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber2" className="form-label">
            رقم الهاتف
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            id="exampleFormControlNumber2"
            name="phoneNumber"
            aria-label="default input example"
            dir="rtl"
            defaultValue={updatedFields.phoneNumber ?? user.phoneNumber}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDate2" className="form-label">
            تاريخ التعيين
          </label>
          <input
            type="date"
            onChange={handleChange}
            className="form-control"
            id="exampleInputDate2"
            name="hireDate"
            defaultValue={
              (updatedFields.hireDate ?? user.hireDate ?? "").split("T")[0]
            }
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDate3" className="form-label">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            onChange={handleChange}
            className="form-control"
            id="exampleInputDate3"
            name="dateOfBirth"
            defaultValue={
              (updatedFields.dateOfBirth ?? user.dateOfBirth ?? "").split(
                "T"
              )[0]
            }
          />
        </div>

        {(updatedFields.roleName ?? user.roleName) === "هيئة تدريس" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name="position"
              onChange={handleChange}
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
              value={updatedFields.position ?? user.position ?? ""}
            >
              <option value="" disabled selected>
                اختر الدرجة
              </option>
              <option value="2">دكتور</option>
              <option value="1">معيد</option>
            </select>
          </div>
        ) : (updatedFields.roleName ?? user.roleName) === "موظف" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name="position"
              onChange={handleChange}
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
              value={updatedFields.position ?? user.position ?? ""}
            >
              <option value="" disabled selected>
                اختر الدرجة
              </option>
              <option value={2}>إداري</option>
              <option value={1}>عامل</option>
            </select>
          </div>
        ) : (updatedFields.roleName ?? user.roleName) === "عميد الكلية" ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name="position"
              onChange={handleChange}
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
              value={updatedFields.position ?? user.position ?? ""}
            >
              <option value="" disabled selected>
                اختر الدرجة
              </option>
              <option value={2}>دكتور</option>
            </select>
          </div>
        ) : (updatedFields.roleName ?? user.roleName) === "أمين الكلية" ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name="position"
              onChange={handleChange}
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
              value={updatedFields.position ?? user.position ?? ""}
            >
              <option value="" disabled selected>
                اختر الدرجة
              </option>
              <option value={2}>إداري</option>
            </select>
          </div>
        ) : null}

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText5" className="form-label">
            المحافظة
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText5"
            name="governorate"
            aria-label="default input example"
            defaultValue={updatedFields.governorate ?? user.governorate}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText6" className="form-label">
            المدينة
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText6"
            name="state"
            aria-label="default input example"
            defaultValue={updatedFields.state ?? user.state}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText7" className="form-label">
            القرية / الشارع
          </label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            id="exampleFormControlText7"
            name="street"
            aria-label="default input example"
            defaultValue={updatedFields.street ?? user.street}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            البريد الإلكتروني
          </label>
          <input
            className="form-control"
            type="email"
            onChange={handleChange}
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            defaultValue={updatedFields.email ?? user.email}
          />
        </div>
        {["هيئة تدريس", "موظف"].includes(
          updatedFields.roleName ?? user.roleName
        ) && (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleInputDeputy1" className="form-label">
              القسم
            </label>
            <select
              className="form-select"
              id="exampleInputDeputy1"
              aria-label="Default select example"
              onChange={(e) => setDepartement_ID(e.target.value)}
              value={
                departement_ID ??
                departments.find((dept) => dept.name === user.departmentName)
                  ?.id ??
                ""
              }
            >
              <option value="" disabled selected>
                اختر القسم
              </option>
              <option value={null}>حذف القسم</option>
              {getFilteredDepartments().map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {user.disability === false &&
        monthsOfWork <= 6 &&
        yearsOfWork < 1 &&
        age <= 50 ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber10" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input
              max={0}
              className="form-control"
              type="number"
              onChange={handleChange}
              id="exampleFormControlNumber10"
              name="normalLeavesCount"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount ?? user.normalLeavesCount
              }
            />
          </div>
        ) : user.disability === false &&
          monthsOfWork >= 6 &&
          monthsOfWork <= 12 &&
          yearsOfWork < 1 &&
          age <= 50 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber10" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input
              max={15}
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="حد أقصى: 15"
              id="exampleFormControlNumber10"
              name="normalLeavesCount"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount ?? user.normalLeavesCount
              }
            />
          </div>
        ) : user.disability === false &&
          yearsOfWork >= 1 &&
          yearsOfWork < 10 &&
          age <= 50 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input
              max={36}
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="حد أقصى: 36"
              id="exampleFormControlNumber11"
              name="normalLeavesCount"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount ?? user.normalLeavesCount
              }
            />
          </div>
        ) : user.disability === false && yearsOfWork >= 10 && age <= 50 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber12" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input
              max={45}
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="حد أقصى: 45"
              id="exampleFormControlNumber12"
              name="normalLeavesCount"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount ?? user.normalLeavesCount
              }
            />
          </div>
        ) : age >= 50 || user.disability === true ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber13" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input
              max={60}
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="حد أقصى: 60"
              id="exampleFormControlNumber13"
              aria-label="default input example"
              name="normalLeavesCount"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount ?? user.normalLeavesCount
              }
            />
          </div>
        ) : null}

        {hireYear >= 2015 ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber5" className="form-label">
              عدد الإجازات الاعتيادية_47
            </label>
            <input
              className="form-control"
              type="number"
              onChange={handleChange}
              id="exampleFormControlNumber5"
              name="normalLeavesCount_47"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount_47 ?? user.normalLeavesCount_47
              }
            />
          </div>
        ) : hireYear <= 2015 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber5" className="form-label">
              عدد الإجازات الاعتيادية_47
            </label>
            <input
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="مثال: 33"
              id="exampleFormControlNumber5"
              name="normalLeavesCount_47"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.normalLeavesCount_47 ?? user.normalLeavesCount_47
              }
            />
          </div>
        ) : null}

        {hireYear >= 2015 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber4" className="form-label">
              عدد الأيام المأخوذة هذه السنة من 81
            </label>
            <input
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="مثال: 23"
              id="exampleFormControlNumber4"
              name="howManyDaysFrom81And47"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.howManyDaysFrom81And47 ??
                user.howManyDaysFrom81And47
              }
            />
          </div>
        ) : hireYear <= 2015 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber4" className="form-label">
              عدد الأيام المأخوذة هذه السنة من47 و 81
            </label>
            <input
              className="form-control"
              type="number"
              onChange={handleChange}
              placeholder="مثال: 23"
              id="exampleFormControlNumber4"
              name="howManyDaysFrom81And47"
              aria-label="default input example"
              dir="rtl"
              defaultValue={
                updatedFields.howManyDaysFrom81And47 ??
                user.howManyDaysFrom81And47
              }
            />
          </div>
        ) : null}

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber6" className="form-label">
            عدد الإجازات الاعتيادية_81 قبل سنة
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="مثال: 16"
            id="exampleFormControlNumber6"
            name="normalLeavesCount_81Before1Years"
            aria-label="default input example"
            dir="rtl"
            defaultValue={
              updatedFields.normalLeavesCount_81Before1Years ??
              user.normalLeavesCount_81Before1Years
            }
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber7" className="form-label">
            عدد الإجازات الاعتيادية_81 قبل سنتين
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="مثال: 18"
            id="exampleFormControlNumber7"
            name="normalLeavesCount_81Before2Years"
            aria-label="default input example"
            dir="rtl"
            defaultValue={
              updatedFields.normalLeavesCount_81Before2Years ??
              user.normalLeavesCount_81Before2Years
            }
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber8" className="form-label">
            عدد الإجازات الاعتيادية_81 قبل 3 سنوات
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="مثال: 26"
            id="exampleFormControlNumber8"
            name="normalLeavesCount_81Before3Years"
            aria-label="default input example"
            dir="rtl"
            defaultValue={
              updatedFields.normalLeavesCount_81Before3Years ??
              user.normalLeavesCount_81Before3Years
            }
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber12" className="form-label">
            عدد الإجازات العارضة
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="مثال: 4"
            id="exampleFormControlNumber12"
            name="casualLeavesCount"
            aria-label="default input example"
            dir="rtl"
            defaultValue={
              updatedFields.casualLeavesCount ?? user.casualLeavesCount
            }
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber9" className="form-label">
            عدد الإجازات المرضية
          </label>
          <input
            className="form-control"
            type="number"
            onChange={handleChange}
            placeholder="مثال: 2"
            id="exampleFormControlNumber9"
            name="nonChronicSickLeavesCount"
            aria-label="default input example"
            dir="rtl"
            defaultValue={
              updatedFields.nonChronicSickLeavesCount ??
              user.nonChronicSickLeavesCount
            }
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <Btn name="حفظ التعديلات" link="/" className="btn-primary w-50" />
        </div>
      </form>
    </div>
  );
}

export default EditEmployeeForHR;
