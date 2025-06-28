import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Swal from "sweetalert2";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, token, validate } from "../server/serves";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonArrowUpFromLine } from "@fortawesome/free-solid-svg-icons";

function AddEmployee() {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [forthName, setForthName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [position, setPosition] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [normalLeavesCount, setNormalLeavesCount] = useState("0");
  const [casualLeavesCount, setCasualLeavesCount] = useState("");
  const [nonChronicSickLeavesCount, setnonChronicSickLeavesCount] = useState("");
  const [departement_ID, setDepartement_ID] = useState(null);
  const [normalLeavesCount_47, setNormalLeavesCount_47] = useState("0");
  const [normalLeavesCount_81Before3Years,setNormalLeavesCount_81Before3Years,] = useState("");
  const [normalLeavesCount_81Before2Years,setNormalLeavesCount_81Before2Years,] = useState("");
  const [normalLeavesCount_81Before1Years,setNormalLeavesCount_81Before1Years,] = useState("");
  const [howManyDaysFrom81And47, setHowManyDaysFrom81And47] = useState("");
  const [yearsOfWork, setYearsOfWork] = useState(0);
  const [monthsOfWork, setMonthsOfWork] = useState(0);
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
  const [disability, setDisability] = useState({});
  const hireYear = new Date(hireDate).getFullYear();


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
    if (hireDate) calculateYearsOfWork(hireDate);
  }, [hireDate]);

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
    setMonthsOfWork(getMonths(hireDate));
  }, [hireDate]);

  const [age, setAge] = useState(0);
  const getAge = (dateOfBirth) => {
    const dateeOfBirth = new Date(dateOfBirth);
    const todayy = new Date();

    let yearsDiff = todayy.getFullYear() - dateeOfBirth.getFullYear();
    let monthsDiff = todayy.getMonth() - dateeOfBirth.getMonth();
    let daysDiff = todayy.getDate() - dateeOfBirth.getDate();

    // لو كان الشهر الحالي أقل من الشهر في تاريخ الميلاد، نخصم سنة واحدة
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
    }
    return yearsDiff;
  };

  useEffect(() => {
    setAge(getAge(dateOfBirth));
  }, [dateOfBirth]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Role/GetAllRoles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRoles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching roles:", err));
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



  const handleData = (e) => {
  e.preventDefault();

  if (
    !firstName || !secondName || !thirdName || !forthName || !userName || !dateOfBirth ||
    !nationalID || !phoneNumber || !howManyDaysFrom81And47 || !normalLeavesCount || !normalLeavesCount_47 ||
    !normalLeavesCount_81Before1Years || !normalLeavesCount_81Before2Years || !normalLeavesCount_81Before3Years ||
    !nonChronicSickLeavesCount || !governorate || !state || !street ||
    disability === "" || disability === null || disability === undefined ||
    !email || !hireDate || !casualLeavesCount || !gender || !password
  ) {
    Swal.fire({
      title: `<span style='color:red;'>تنبيه!</span>`,
      text: "يرجى ملء جميع الحقول المطلوبة قبل الإضافة.",
      icon: "warning",
      confirmButtonText: "حسنًا",
      customClass: {
        title: 'text-blue',
        confirmButton: 'blue-button',
        cancelButton: 'red-button'
      },
      didOpen: () => {
        const popup = document.querySelector('.swal2-popup');
        if (popup) popup.setAttribute('dir', 'rtl');
      }
    });
    return;
  }

  Swal.fire({
    title: "هل أنت متأكد؟",
    text: "هل ترغب في إضافة موظف جديد؟",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "نعم، أضف الموظف",
    cancelButtonText: "إلغاء",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      const newEmployee = {
        firstName, secondName, thirdName, forthName, userName, dateOfBirth, position, nationalID, phoneNumber,
        howManyDaysFrom81And47, normalLeavesCount, normalLeavesCount_47, normalLeavesCount_81Before1Years,
        normalLeavesCount_81Before2Years, normalLeavesCount_81Before3Years, nonChronicSickLeavesCount,
        governorate, state, street, email, hireDate, casualLeavesCount, departement_ID, gender, password, disability,
      };

      fetch(`${BASE_API_URL}/api/Account/CreateUser/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployee),
      })
        .then(async (response) => {
          if (response.status === 403) {
            window.location.href = "/error403";
            return;
          }

          const data = await response.json();
          if (!response.ok) {
            if (data.errors) {
              const validationMessages = Object.values(data.errors)
                .flat()
                .join("\n");
              throw new Error(validationMessages);
            }
            throw new Error(data.message || "حدث خطأ أثناء حفظ البيانات.");
          }

          return data;
        })
        .then((data) => {
          Swal.fire({
            title: `<span style='color:#0d6efd;'>تمت إضافة الموظف بنجاح.</span>`,
            icon: "success",
            confirmButtonText: "مشاهدة الموظفين",
            customClass: {
              title: 'text-blue',
              confirmButton: 'blue-button',
              cancelButton: 'red-button'
            },
            didOpen: () => {
              const popup = document.querySelector('.swal2-popup');
              if (popup) popup.setAttribute('dir', 'rtl');
            }
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/employees/active";
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: `<span style='color:red;'>فشل في الإضافة</span>`,
            text: error.message,
            icon: "error",
            confirmButtonColor: "#d33",
            customClass: {
              title: 'text-red',
              confirmButton: 'blue-button',
              cancelButton: 'red-button'
            },
            didOpen: () => {
              const popup = document.querySelector('.swal2-popup');
              if (popup) popup.setAttribute('dir', 'rtl');
            }
          });
        });
    }
  });
};

  



  return (
    <div>
      <div className="d-flex mb-3 justify-content-between">
        <div className="zzz d-inline-block">
          <h2 className="m-0">إضافة موظف</h2>
        </div>

        <div className="d-flex">
          <Link to="/employees/UploadUsersExcel" role="button" className="btn btn-primary my-3 d-flex align-items-center ms-3" >
            <FontAwesomeIcon icon={faPersonArrowUpFromLine} style={{ fontSize: "1.2em" }} />
            <span className="d-none d-sm-inline">&nbsp;رفع موظف بالاكسيل</span>
          </Link>
        </div>

        
      </div>

      <form className="row" onSubmit={handleData}>
        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDeputy0" className="form-label">
            الشخص ذو إعاقة
          </label>
          <select
            className="form-select"
            id="exampleInputDeputy0"
            aria-label="Default select example"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "true") setDisability(true);
              else if (value === "false") setDisability(false);
              else setDisability("");
            }}
          >
            <option value="" disabled selected>اختر</option>
            <option value="false">لا</option>
            <option value="true">نعم</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDeputy4" className="form-label">المنصب</label>
          <select
            className="form-select"
            id="exampleInputDeputy4"
            aria-label="Default select example"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled selected>اختر منصبًا</option>
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
            aria-label="Default select example"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled selected>اختر الجنس</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber1" className="form-label">
            الرقم القومي
          </label>
          <input
            className="form-control"
            type="number"
            onChange={(e) => setNationalID(e.target.value)}
            placeholder="مثال: 30201241201212"
            id="exampleFormControlNumber1"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText1" className="form-label">
            الاسم الأول
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="مثال: يحيى"
            id="exampleFormControlText1"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText2" className="form-label">
            الاسم الثاني
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setSecondName(e.target.value)}
            placeholder="مثال: سعد"
            id="exampleFormControlText2"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText3" className="form-label">
            الاسم الثالث
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setThirdName(e.target.value)}
            placeholder="مثال: عبدالموجود"
            id="exampleFormControlText3"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText4" className="form-label">
            الاسم الرابع
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setForthName(e.target.value)}
            placeholder="مثال: جادالرب"
            id="exampleFormControlText4"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText0" className="form-label">
            اسم المستخدم
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="مثال: yahyasaad"
            id="exampleFormControlText0"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber2" className="form-label">
            رقم الهاتف
          </label>
          <input
            className="form-control"
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="مثال: 01127471188"
            id="exampleFormControlNumber2"
            aria-label="default input example"
            dir="rtl"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDate2" className="form-label">
            تاريخ التعيين
          </label>
          <input
            type="date"
            onChange={(e) => setHireDate(e.target.value)}
            className="form-control"
            id="exampleInputDate2"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputDate3" className="form-label">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="form-control"
            id="exampleInputDate3"
          />
        </div>

        {/* <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
                    <label htmlFor="exampleFormControlNumber10" className="form-label">سنوات العمل</label>
                    <input className="form-control" type="number" onChange={(e)=> SetYearsOfWork(e.target.value)} placeholder="11" id="exampleFormControlNumber10" aria-label="default input example" dir="rtl" />
                </div> */}

        {role === "هيئة تدريس" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name=""
              onChange={(e) => setPosition(e.target.value)}
              placeholder="2"
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
            >
              <option value="" disabled selected>اختر الدرجة</option>
              <option value={2}>دكتور</option>
              <option value={1}>معيد</option>
            </select>
          </div>
        ) : role === "موظف" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name=""
              onChange={(e) => setPosition(e.target.value)}
              placeholder="2"
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
            >
              <option value="" disabled selected>اختر الدرجة</option>
              <option value={2}>إداري</option>
              <option value={1}>عامل</option>
            </select>
          </div>
        ) : role === "عميد الكلية" ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name=""
              onChange={(e) => setPosition(e.target.value)}
              placeholder="2"
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
            >
              <option value="">اختر الدرجة</option>
              <option value={2}>دكتور</option>
            </select>
          </div>
        ) : role === "أمين الكلية" ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label">
              الدرجة
            </label>
            <select
              className="form-select"
              name=""
              onChange={(e) => setPosition(e.target.value)}
              placeholder="2"
              id="exampleFormControlNumber11"
              aria-label="default input example"
              dir="rtl"
            >
              <option value="">اختر الدرجة</option>
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
            onChange={(e) => setGovernorate(e.target.value)}
            placeholder="مثال: قنا"
            id="exampleFormControlText5"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText6" className="form-label">
            المدينة
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setState(e.target.value)}
            placeholder="مثال: قوص"
            id="exampleFormControlText6"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlText7" className="form-label">
            القرية / الشارع
          </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setStreet(e.target.value)}
            placeholder="مثال: طريق الشوادر بجوار قاعة شهرزاد"
            id="exampleFormControlText7"
            aria-label="default input example"
          />
        </div>





        {role === "هيئة تدريس" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleInputDeputy1" className="form-label">
              القسم
            </label>
            <select
              className="form-select"
              id="exampleInputDeputy1"
              aria-label="Default select example"
              onChange={(e) => setDepartement_ID(e.target.value)}
            >
              <option value="" disabled selected>اختر القسم</option>
              {departments
                .filter((department) => department.departmentType === true)
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </select>
          </div>
        ): role === "موظف" ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleInputDeputy1" className="form-label">
              القسم
            </label>
            <select
              className="form-select"
              id="exampleInputDeputy1"
              aria-label="Default select example"
              onChange={(e) => setDepartement_ID(e.target.value)}
            >
              <option value="" disabled selected>اختر القسم</option>
              {departments
                .filter((department) => department.departmentType === false)
                .map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </select>
          </div>
        ) : null}

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            البريد الإلكتروني
          </label>
          <input
            className="form-control"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="مثال: yahyasaad2024@gmail.com"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            كلمة المرور
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            id="exampleInputPassword1"
            onInput={() => validate("exampleFormControlNumber2", "كلمة المرور يجب أن تكون 8 أرقام على الأقل", 8)}
          />
        </div>

        {disability === false && monthsOfWork < 6 && yearsOfWork < 1 && age <= 50 ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber10" className="form-label">عدد الإجازات الاعتيادية</label>
            <input min={0} className="form-control" type="number" onChange={(e) => setNormalLeavesCount(0)} id="exampleFormControlNumber10" aria-label="default input example" dir="rtl"/>
          </div>

          ) : disability === false && monthsOfWork >= 6 && monthsOfWork < 12 && yearsOfWork < 1 && age <= 50 ? (
            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
              <label htmlFor="exampleFormControlNumber10" className="form-label">عدد الإجازات الاعتيادية</label>
              <input max={15} className="form-control" type="number" onChange={(e) => setNormalLeavesCount(e.target.value)} placeholder="حد أقصى: 15" id="exampleFormControlNumber10" aria-label="default input example" dir="rtl"/>
            </div>

          ) : disability === false && yearsOfWork >= 1 && yearsOfWork < 10 && age <= 50 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber11" className="form-label"> عدد الإجازات الاعتيادية</label>
            <input max={36} className="form-control" type="number" onChange={(e) => setNormalLeavesCount(e.target.value)} placeholder="حد أقصى: 36" id="exampleFormControlNumber11" aria-label="default input example" dir="rtl"/>
          </div>

        ) : disability === false && yearsOfWork >= 10 && age <= 50 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber12" className="form-label">عدد الإجازات الاعتيادية</label>
            <input max={45} className="form-control" type="number" onChange={(e) => setNormalLeavesCount(e.target.value)} placeholder="حد أقصى: 45" id="exampleFormControlNumber12" aria-label="default input example" dir="rtl"/>
          </div>

        ) : age >= 50 || disability === true ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber13" className="form-label">
              عدد الإجازات الاعتيادية
            </label>
            <input max={60} className="form-control" type="number" onChange={(e) => setNormalLeavesCount(e.target.value)} placeholder="حد أقصى: 60" id="exampleFormControlNumber13" aria-label="default input example" dir="rtl"/></div>
        ) : null}

        {hireYear >= 2015 ? (
          <div className="d-none col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber5" className="form-label">
              عدد الإجازات الاعتيادية_47
            </label>
            <input className="form-control" type="number" onChange={(e) => setNormalLeavesCount_47(e.target.value)} id="exampleFormControlNumber5" aria-label="default input example" dir="rtl"/>
          </div>
        ) : hireYear <= 2015 ? (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
            <label htmlFor="exampleFormControlNumber5" className="form-label">
              عدد الإجازات الاعتيادية_47
            </label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => setNormalLeavesCount_47(e.target.value)}
              placeholder="مثال: 33"
              id="exampleFormControlNumber5"
              aria-label="default input example"
              dir="rtl"
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
              onChange={(e) => setHowManyDaysFrom81And47(e.target.value)}
              placeholder="مثال: 23"
              id="exampleFormControlNumber4"
              aria-label="default input example"
              dir="rtl"
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
              onChange={(e) => setHowManyDaysFrom81And47(e.target.value)}
              placeholder="مثال: 23"
              id="exampleFormControlNumber4"
              aria-label="default input example"
              dir="rtl"
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
            onChange={(e) =>
              setNormalLeavesCount_81Before1Years(e.target.value)
            }
            placeholder="مثال: 16"
            id="exampleFormControlNumber6"
            aria-label="default input example"
            dir="rtl"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber7" className="form-label">
            عدد الإجازات الاعتيادية_81 قبل سنتين
          </label>
          <input
            className="form-control"
            type="number"
            onChange={(e) =>
              setNormalLeavesCount_81Before2Years(e.target.value)
            }
            placeholder="مثال: 18"
            id="exampleFormControlNumber7"
            aria-label="default input example"
            dir="rtl"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber8" className="form-label">
            عدد الإجازات الاعتيادية_81 قبل 3 سنوات
          </label>
          <input
            className="form-control"
            type="number"
            onChange={(e) =>
              setNormalLeavesCount_81Before3Years(e.target.value)
            }
            placeholder="مثال: 26"
            id="exampleFormControlNumber8"
            aria-label="default input example"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber12" className="form-label">
            عدد الإجازات العارضة
          </label>
          <input
            className="form-control"
            type="number"
            onChange={(e) => setCasualLeavesCount(e.target.value)}
            placeholder="حد أقصى: ٧"
            id="exampleFormControlNumber12"
            aria-label="default input example"
            onInput={() => validate("exampleFormControlNumber12", "عدد أيام الاجازة العارضة يجب أن يكون أقل من أو يساوي 7 أيام", 7)}
          />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3">
          <label htmlFor="exampleFormControlNumber9" className="form-label">
            عدد الإجازات المرضية الغير مزمنة
          </label>
          <input
            className="form-control"
            type="number"
            onChange={(e) => setnonChronicSickLeavesCount(e.target.value)}
            placeholder="مثال: ٢"
            id="exampleFormControlNumber9"
            aria-label="default input example"
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <Btn name="إضافة" link="/" className="btn-primary w-50 mb-3" />
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
