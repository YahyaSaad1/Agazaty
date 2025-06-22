import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileCom from "../components/ProfileCom";
import ProfileDescription from "../components/ProfileDescription";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { faEdit, faTable } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, token } from "../server/serves";
import "../CSS/Profile.css";
function ProfileForHR() {
  const { userID } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/Account/GetUserById/${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [userID]);

  const handleLeaveUpdate = async () => {
    const { value: decision } = await Swal.fire({
      title: "هل تريد إضافة أم خصم أيام الإجازة؟",
      input: "radio",
      inputOptions: {
        true: "إضافة أيام",
        false: "خصم أيام",
      },
      customClass: {
        title: "text-blue",
        confirmButton: "blue-button",
        cancelButton: "red-button",
      },
      didOpen: () => {
        const popup = document.querySelector(".swal2-popup");
        if (popup) popup.setAttribute("dir", "rtl");
      },
      inputValidator: (value) => {
        if (!value) {
          return "يجب اختيار أحد الخيارين";
        }
      },
      showCancelButton: true,
      confirmButtonText: "التالي",
      cancelButtonText: "إلغاء",
    });

    if (decision === undefined) return;

    const { value: days } = await Swal.fire({
      title:
        decision === "true"
          ? "كم عدد الأيام التي تريد إضافتها؟"
          : "كم عدد الأيام التي تريد خصمها؟",
      input: "number",
      inputLabel: "عدد الأيام",
      inputPlaceholder: "مثال: 3",
      showCancelButton: true,
      confirmButtonText: "التالي",
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
      inputValidator: (value) => {
        if (!value || isNaN(value) || parseInt(value) <= 0) {
          return "يرجى إدخال رقم أكبر من صفر";
        }
      },
    });

    if (days === undefined) return;

    const { value: notes } = await Swal.fire({
      title: "يرجى كتابة ملاحظة توضح سبب التعديل",
      input: "textarea",
      inputPlaceholder: "مثال: تم خصم أيام بسبب غياب غير مبرر",
      showCancelButton: true,
      confirmButtonText: "تنفيذ",
      cancelButtonText: "إلغاء",
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return "الملاحظة مطلوبة";
        }
      },
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

    if (notes === undefined) return;

    try {
      const response = await fetch(
        `${BASE_API_URL}/api/NormalLeave/MinusOrAddNormalLeavesToUser/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            days: parseInt(days),
            decision: decision === "true",
            notes: notes.trim(),
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "تم تعديل عدد أيام الإجازات بنجاح",
          icon: "success",
          confirmButtonText: "حسنًا",
          customClass: {
            title: "text-blue",
            confirmButton: "blue-button",
            cancelButton: "red-button",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
          },
        }).then(() => {
          window.location.reload(); // إعادة تحميل الصفحة بعد التأكيد
        });
      } else {
        Swal.fire({
          title: "حدث خطأ أثناء التعديل",
          icon: "error",
          confirmButtonText: "حسنًا",
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "تعذر الاتصال بالخادم",
        icon: "error",
        confirmButtonText: "حسنًا",
        didOpen: () => {
          const popup = document.querySelector(".swal2-popup");
          if (popup) popup.setAttribute("dir", "rtl");
        },
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/Account/export-user-excel/${userData.nationalID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `بيانات ${userData.fullName}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };

  return (
    <div>
      <div className="d-flex mb-4 justify-content-between">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">
            ملف {userData.firstName} {userData.secondName} الشخصي
          </h2>
        </div>
        <div className="d-flex ms-3">
          <button
            onClick={handleDownload}
            className="m-3 btn btn-success d-flex justify-content-center align-items-center"
          >
            <FontAwesomeIcon icon={faTable} style={{ fontSize: "1.4rem" }} color="#fff"/>
            <span className="d-none d-sm-inline">&nbsp;تنزيل البيانات</span>
          </button>

          <button className="my-3 btn btn-primary" onClick={handleLeaveUpdate}>
            <FontAwesomeIcon icon={faEdit} style={{ fontSize: "1.4rem" }} color="#fff"/>
            <span className="d-none d-sm-inline">&nbsp; تعديل عدد أيام الإجازات</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mt-4">
          <ProfileCom userData={userData} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-7 col-xl-8 col-xxl-9 mt-4">
          <ProfileDescription userData={userData} />
        </div>
      </div>
    </div>
  );
}

export default ProfileForHR;
