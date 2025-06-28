import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import Swal from "sweetalert2";
import { BASE_API_URL, token } from "../server/serves";

function AddDepartment(){
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [managerId, setManagerId] = useState('');
    const [departmentType, setDepartmentType] = useState('');
    const [managerName, setManagerName] = useState('غير معروف');
    const [users, setUsers] = useState([]);

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
            .catch((error) => {
                console.error("Error fetching users:", error);
                setUsers([]);
            });
    }, []);

    // ✅ جلب اسم المدير عند تغيّر الـ ID
    useEffect(() => {
        if (!managerId) return;

        fetch(`${BASE_API_URL}/api/Account/GetUserById/${managerId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.text();
            })
            .then((text) => {
                if (text) {
                    const data = JSON.parse(text);
                    setManagerName(data.fullName || "غير معروف");
                } else {
                    setManagerName("غير معروف");
                }
            })
            .catch((error) => {
                console.error("Error fetching manager name:", error);
                setManagerName("غير معروف");
            });
    }, [managerId]);

    const handleData = (e) => {
        e.preventDefault();

        const newDepartment = { name, managerId, code, createDate, departmentType };

        fetch(`${BASE_API_URL}/api/Department/CreateDepartment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newDepartment),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    title: data.success ? 'تم بنجاح!' : 'خطأ!',
                    text: `${data.message}`,
                    icon: data.success ? "success" : "error",
                    confirmButtonText: data.success ? "مشاهدة الأقسام" : "حسناً",
                    customClass: {
                        title: 'text-red',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                }).then((result) => {
                    if (data.success && result.isConfirmed) {
                        window.location.href = "/departments";
                    }
                });
            })
            .catch((error) => {
                console.error("Error submitting department:", error);
                Swal.fire({
                    title: `<span style='color:red;'>خطأ في الإضافة</span>`,
                    text: "حدث خطأ أثناء حفظ البيانات. حاول مرة أخرى.",
                    icon: "error",
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
    };

    const confirmSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: `<span style='color:#0d6efd;'>هل أنت متأكد من إنشاء قسم ؟</span>`,
            html: `
                <p dir='rtl'><span style='font-weight: bold;'>اسم القسم:</span> <span style='color:#0d6efd;'>${name}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>تاريخ الإنشاء:</span> <span style='color:#0d6efd;'>${createDate}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>رئيس القسم:</span> <span style='color:#0d6efd;'>${managerName}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>كود القسم:</span> <span style='color:#0d6efd;'>${code}</span></p>
                <p dir='rtl'><span style='font-weight: bold;'>الهيئة:</span> <span style='color:#0d6efd;'>${departmentType ? "هيئة التدريس" : "الموظفين"}</span></p>
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، إنشاء",
            cancelButtonText: "لا، إلغاء",
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
                handleData(e);
            }
        });
    };

    return(
        <div>
            <div>
                <div className="zzz d-inline-block">
                    <h2 className="m-0">إضافة قسم</h2>
                </div>
            </div>
            <form onSubmit={handleData}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="exampleFormControlText1" className="form-label">اسم القسم</label>
                        <input className="form-control" type="text" onChange={(e)=> setName(e.target.value)} placeholder="علوم الحاسب" id="exampleFormControlText1" aria-label="default input example" />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="departmentType" className="form-label">الهيئة التابع لها</label>
                        <select className="form-select" id="departmentType" onChange={(e) => setDepartmentType(e.target.value === "true")} required >
                            <option value="" disabled selected>أختر الهيئة التابع لها</option>
                            <option value="true">هيئة تدريس</option>
                            <option value="false">موظفين</option>
                        </select>
                    </div>




                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="manager" className="form-label">رئيس القسم</label>
                        <select className="form-select" id="manager" onChange={(e) => setManagerId(e.target.value)} required>
                            <option value="" disabled selected>أختر رئيس القسم</option>
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>
                                    {user.fullName} ({user.departmentName})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="exampleInputDate2" className="form-label">تاريخ الإنشاء</label>
                        <input type="date" onChange={(e)=> setCreateDate(e.target.value)} className="form-control" id="exampleInputDate2" />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="exampleFormControlText2" className="form-label">كود القسم</label>
                        <input className="form-control" type="text" onChange={(e)=> setCode(e.target.value)} placeholder="CS7683" id="exampleFormControlText2" aria-label="default input example" />
                    </div>
                </div>

                <div onClick={confirmSubmit} className="d-flex justify-content-center mt-3">
                    <Btn name='إنشاء' link='/' className='btn-primary w-50' />
                </div>
            </form>
        </div>
    )
}

export default AddDepartment;








