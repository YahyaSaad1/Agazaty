import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { BASE_API_URL, rowsPerPage, token } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck,faCircleXmark, faEdit, faPrint,} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function DesPermits() {
    const [permitLeaves, setPermitLeaves] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/PermitLeave/GetAllPermitLeaves`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
            setPermitLeaves(data);
            } else if (Array.isArray(data.result)) {
            setPermitLeaves(data.result);
            } else {
            console.error("Unexpected data format:", data);
            setPermitLeaves([]);
            }
        })
        .catch((err) => console.error("Error fetching permit leaves:", err));

        fetch(`${BASE_API_URL}/api/Account/GetAllActiveUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }, []);

    const handleLeaveUpdate = async () => {
        const inputId = "user-input-datalist";
        const datalistId = "users-datalist";

        const { value: selectedUserId } = await Swal.fire({
        title: "اختر الموظف",
        html: `
            <style>
            #${inputId} {
                width: 95%;
                padding: 1em;
                margin: 0;
                font-size: 1.1em;
                box-sizing: border-box;
            }
            </style>
            <input id="${inputId}" className="swal2-input" list="${datalistId}" placeholder="اختر موظفًا">
            <datalist id="${datalistId}">
            ${users
                .map(
                (user) =>
                    `<option value="${user.fullName}" data-id="${user.id}"></option>`
                )
                .join("")}
            </datalist>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "التالي",
        cancelButtonText: "إلغاء",
        preConfirm: () => {
            const input = document.getElementById(inputId);
            const selectedName = input.value.trim();
            if (!selectedName) {
            Swal.showValidationMessage("يجب اختيار موظف");
            return;
            }
            const option = [
            ...document.querySelectorAll(`#${datalistId} option`),
            ].find((opt) => opt.value === selectedName);
            if (!option) {
            Swal.showValidationMessage("الموظف غير موجود بالقائمة");
            return;
            }
            return option.dataset.id;
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

        if (!selectedUserId) return;

        const { value: days } = await Swal.fire({
        title: "كم عدد الأيام التي تريد خصمها؟",
        input: "number",
        inputPlaceholder: "مثال: 3",
        showCancelButton: true,
        confirmButtonText: "التالي",
        cancelButtonText: "إلغاء",
        customClass: {
            title: "text-blue",
            confirmButton: "blue-button",
            cancelButton: "red-button",
        },
        inputValidator: (value) =>
            (!value || isNaN(value) || parseInt(value) <= 0) &&
            "يرجى إدخال رقم أكبر من صفر",
        didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
        },
        });

        if (days === undefined) return;

        const { value: notes } = await Swal.fire({
        title: "يرجى كتابة ملاحظة توضح سبب الخصم",
        input: "textarea",
        inputPlaceholder: "مثال: تم خصم أيام بسبب غياب غير مبرر",
        showCancelButton: true,
        confirmButtonText: "تنفيذ",
        cancelButtonText: "إلغاء",
        customClass: {
            title: "text-blue",
            confirmButton: "blue-button",
            cancelButton: "red-button",
        },
        inputValidator: (value) =>
            (!value || value.trim() === "") && "الملاحظة مطلوبة",
        didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
        },
        });

        if (notes === undefined) return;

        try {
        const response = await fetch(
            `${BASE_API_URL}/api/NormalLeave/MinusOrAddNormalLeavesToUser/${selectedUserId}`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                days: parseInt(days),
                decision: false,
                notes: notes.trim(),
            }),
            }
        );

        if (response.ok) {
            Swal.fire({
            title: "تم خصم الأيام بنجاح",
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
            }).then(() => window.location.reload());
        } else {
            Swal.fire({
            title: "حدث خطأ أثناء الخصم",
            icon: "error",
            confirmButtonText: "حسنًا",
            customClass: {
                title: "text-red",
                confirmButton: "blue-button",
                cancelButton: "red-button",
            },
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
            customClass: {
            title: "text-red",
            confirmButton: "blue-button",
            cancelButton: "red-button",
            },
            didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            if (popup) popup.setAttribute("dir", "rtl");
            },
        });
        }
    };

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/PermitLeave/GetAllPermitLeaves`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
            setPermitLeaves(data);
            } else if (Array.isArray(data.result)) {
            setPermitLeaves(data.result);
            } else {
            console.error("Unexpected data format:", data);
            setPermitLeaves([]);
            }
        })
        .catch((err) => console.error("Error fetching permit leaves:", err));
    }, []);

    const softDeletePermit = (permitId) => {
        Swal.fire({
        title: "هل أنت متأكد؟",
        text: "سيتم احتساب التصريح ولن يكون مرئيًا في القائمة!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احتساب!",
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
            fetch(
            `${BASE_API_URL}/api/PermitLeave/SoftDeletePermitLeave/${permitId}`,
            {
                method: "PUT",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            )
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                throw new Error(data.message || "خطأ في الاحتساب");
                }

                setPermitLeaves((prev) => prev.filter((p) => p.id !== permitId));

                Swal.fire({
                title: "تم الاحتساب!",
                text: "تم احتساب التصريح بنجاح.",
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
                }).then(() => {
                window.location.reload();
                });
            })
            .catch((error) => {
                Swal.fire({
                title: "خطأ!",
                text: error.message,
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

    if (!permitLeaves || permitLeaves.length === 0) {
        return <LoadingOrError data={permitLeaves} />;
    }

    const filteredRows = permitLeaves
        .filter((permit) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = permit.userName.toLowerCase().includes(query);
        const matchesStatus =
            filterStatus === "all"
            ? true
            : filterStatus === "active"
            ? permit.active === true
            : permit.active === false;

        return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
        if (a.active === b.active) return 0;
        return a.active ? -1 : 1;
        });

    if (permitLeaves === null || permitLeaves === null) {
        return <LoadingOrError data={permitLeaves} />;
    }

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0 text-nowrap">سجل التصاريح</h2>
                </div>
                <div className="d-flex">
                    <button className="m-3 btn btn-outline-primary d-flex justify-content-center align-items-center text-nowrap">
                        <FontAwesomeIcon icon={faPrint} />
                        <span className="d-none d-sm-inline text-nowrap">&nbsp;طباعة البيانات</span>
                    </button>
                    <button className="m-3 me-0 btn btn-primary text-nowrap" onClick={handleLeaveUpdate} >
                        <FontAwesomeIcon icon={faEdit} />
                        <span className="d-none d-sm-inline text-nowrap">&nbsp;تعديل عدد أيام الإجازات</span>
                    </button>
                </div>
            </div>
        <div className="mb-4 me-3 ms-3 d-flex align-items-center gap-3">
            <input type="text" placeholder="بحث عن موظف ..." className="form-control w-75" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

            <select
                className="form-select w-auto"
                value={filterStatus}
                onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                }}
                aria-label="فلتر حالة التصاريح">
                <option className="text-nowrap" value="all">كل التصاريح</option>
                <option className="text-nowrap" value="active">غير محتسب</option>
                <option className="text-nowrap" value="inactive">محتسب</option>
            </select>
        </div>
        <div className="row">
            <div style={{ height: "100vh", overflowY: "auto" }}>
            <table className="m-0 table table-striped">
                <thead className="sticky-top bg-white">
                <tr>
                    <th className="th-mult">المرجع</th>
                    <th className="th-mult">الاسم</th>
                    <th className="th-mult">التاريخ</th>
                    <th className="th-mult">عدد الساعات</th>
                    <th className="th-mult">الأرشيف</th>
                    <th className="th-mult">المزيد</th>
                </tr>
                </thead>
                <tbody>
                {currentRows.length > 0 ? (
                    currentRows.map((permit, index) => (
                    <tr key={permit.id}>
                        <th>
                        #{(indexOfFirstRow + index + 1).toLocaleString("ar-EG")}
                        </th>
                        <th>{permit.userName}</th>
                        <th>{new Date(permit.date).toLocaleDateString("ar-EG")}</th>
                        <th className="text-nowrap" style={{paddingRight: "30px"}}>
                        {permit.hours
                            .toString()
                            .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])}{" "}
                        ساعات
                        </th>
                        <th><BtnLink id={permit.id} name="عرض التصريح" link="/permit-leave" className="btn btn-outline-primary"/></th>
                        {permit.active === true ? (
                        <th>
                            <FontAwesomeIcon
                            icon={faCircleXmark}
                            onClick={() => softDeletePermit(permit.id)}
                            className="fontt"
                            style={{
                                cursor: "pointer",
                                marginLeft: "10px",
                                color: "#ff0000",
                            }}
                            />
                        </th>
                        ) : (
                        <th>
                            <FontAwesomeIcon
                            icon={faCircleCheck}
                            color="green"
                            className="fontt"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            />
                        </th>
                        )}
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={6} className="text-center">
                        لا توجد نتائج لعرضها
                    </td>
                    </tr>
                )}
                </tbody>
            </table>

            {filteredRows.length > rowsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                <nav>
                    <ul className="pagination">
                    <li
                        className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                        }`}
                    >
                        <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
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
                        onClick={() => setCurrentPage(currentPage + 1)}
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

export default DesPermits;
