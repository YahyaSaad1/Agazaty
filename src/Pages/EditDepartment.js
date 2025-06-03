import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_API_URL, token } from "../server/serves";

function EditDepartment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ name: "", code: "" });
    const [users, setUsers] = useState([]);
    const [managerId, setManagerId] = useState('');
    useEffect(() => {
        fetch(`${BASE_API_URL}/api/Account/GetAllActiveUsers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => setUsers(data))
    }, [])
    
    useEffect(() => {
        fetch(`${BASE_API_URL}/api/Department/GetDepartmentById/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
            },
        })
            .then((res) => res.json())
            .then((data) => {
            setDepartment(data);
            setManagerId(data.managerId);
            })
            .catch((error) => console.error("حدث خطأ أثناء جلب البيانات:", error)); // معالجة الأخطاء
        }, [id]);


    const handleChange = (e) => {
        setDepartment({ ...department, [e.target.name]: e.target.value });
    };

    const updateDepartment = async (e) => {
        e.preventDefault();
    
        // إنشاء نسخة من بيانات القسم مع تضمين رئيس القسم الجديد
        const updatedData = {
            ...department,
            managerId: managerId || department.managerId,  // إذا لم يتم تغييره، حافظ على القيمة القديمة
        };
    
        Swal.fire({
            title: `<span style='color:#0d6efd;'>هل أنت متأكد من تحديث بيانات قسم ${department.name} ؟</span>`,
            text: "لا يمكن التراجع عن هذا الإجراء!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، تحديث",
            cancelButtonText: "إلغاء",
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${BASE_API_URL}/api/Department/UpdateDepartment/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedData),  // إرسال البيانات المحدثة مع رئيس القسم
                    });
    
                    if (response.ok) {
                        Swal.fire({
                            title: `<span style='color:#0d6efd;'>تم تحديث بيانات القسم بنجاح.</span>`,
                            icon: "success",
                            confirmButtonText: "مشاهدة الأقسام",
                            confirmButtonColor: "#0d6efd",
                            customClass: {
                                title: 'text-blue',
                                confirmButton: 'blue-button',
                                cancelButton: 'red-button'
                            },
                            didOpen: () => {
                                const popup = document.querySelector('.swal2-popup');
                                if (popup) popup.setAttribute('dir', 'rtl');
                            },
                        }).then(() => {
                            navigate("/departments");
                        });
                    } else {
                        Swal.fire({
                            title: "حدث خطأ!",
                            text: "لم يتم تحديث البيانات، حاول مرة أخرى.",
                            icon: "error",
                            customClass: {
                                title: 'text-red',
                                confirmButton: 'blue-button',
                                cancelButton: 'red-button'
                            },
                            didOpen: () => {
                                const popup = document.querySelector('.swal2-popup');
                                if (popup) popup.setAttribute('dir', 'rtl');
                            },
                        });
                    }
                } catch (error) {
                    console.error("خطأ أثناء تحديث البيانات:", error);
                    Swal.fire({
                        title: "خطأ في الاتصال!",
                        text: "تأكد من تشغيل السيرفر وحاول مجدداً.",
                        icon: "error",
                        customClass: {
                            title: 'text-red',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button'
                        },
                        didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                        },
                    });
                }
            }
        });
    };

    return (
        <form>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">تعديل بيانات قسم {department.name}</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="name" className="form-label">اسم القسم</label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        value={department.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="manager" className="form-label">رئيس القسم</label>
                        <select className="form-select" id="manager" value={managerId} onChange={(e) => setManagerId(e.target.value)} required>
                            <option value="">أختر رئيس القسم</option>
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>
                                    {user.fullName} ({user.departmentName})
                                </option>
                            ))}
                        </select>
                    </div>

                <div className="col-sm-12 col-md-6 mt-3">
                    <label htmlFor="code" className="form-label">كود القسم</label>
                    <input
                        className="form-control"
                        type="text"
                        id="code"
                        name="code"
                        value={department.code}
                        onChange={handleChange}
                    />
                </div>                                              
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button onClick={updateDepartment} className="btn btn-primary w-50">تحديث</button>
            </div>
        </form>
    );
}

export default EditDepartment;