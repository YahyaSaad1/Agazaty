import { useNavigate } from 'react-router-dom';
import Btn from '../components/Btn';
import { useEffect, useState } from 'react';
import Image from '../Images/download.jpeg';
import Swal from 'sweetalert2';

function EditProfile() {
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    const [updatedFields, setUpdatedFields] = useState({});
    const [user, setUser] = useState([]);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (userID) {
            // Get user data and role
            const fetchData = async () => {
                try {
                    const [userRes, roleRes] = await Promise.all([
                        fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`),
                        fetch(`http://agazatyapi.runasp.net/api/Account/GetRoleOfUser/${userID}`)
                    ]);
                    const userData = await userRes.json();
                    const roleData = await roleRes.json();
                    setUser(userData);
                    setUserRole(roleData.role);
                } catch (err) {
                    console.error("Error fetching user data or role:", err);
                }
            };
            fetchData();
        }
    }, [userID]);

    const handleChange = (e) => {
        setUpdatedFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value || user[e.target.name],
        }));
    };

    const updateUser = async (e) => {
        e.preventDefault();

        const finalData = {
            email: updatedFields.email || user.email,
            phoneNumber: updatedFields.phoneNumber || user.phoneNumber,
            governorate: updatedFields.governorate || user.governorate,
            state: updatedFields.state || user.state,
            street: updatedFields.street || user.street,
        };

        const noChanges = Object.entries(finalData).every(
            ([key, value]) => value === user[key]
        );

        if (noChanges) {
            Swal.fire({
                title: "لم تقم بتعديل أي بيانات!",
                icon: "info",
                confirmButtonText: "حسنًا",
                confirmButtonColor: "#0d6efd",
            });
            return;
        }

        Swal.fire({
            title: `<span style='color:#0d6efd;'>هل أنت متأكد من تحديث بياناتك؟</span>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، تحديث",
            cancelButtonText: "إلغاء",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://agazatyapi.runasp.net/api/Account/UdpateUserForUser/${userID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(finalData),
                    });

                    if (response.ok) {
                        Swal.fire({
                            title: `<span style='color:#0d6efd;'>تم تحديث بياناتك بنجاح.</span>`,
                            icon: "success",
                            confirmButtonText: "حسنًا",
                            confirmButtonColor: "#0d6efd",
                        }).then(() => navigate("/profile"));
                    } else {
                        Swal.fire({
                            title: "حدث خطأ!",
                            text: "لم يتم تحديث البيانات، حاول مرة أخرى.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("خطأ أثناء تحديث البيانات:", error);
                    Swal.fire({
                        title: "خطأ في الاتصال!",
                        text: "تأكد من تشغيل السيرفر وحاول مجدداً.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div>
            <div className="d-flex mb-4">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">تعديل الملف الشخصي</h2>
                </div>
            </div>

            <form onSubmit={updateUser}>
                <div className='d-flex row align-items-center'>
                    <div className='col-sm-12 col-md-12 col-lg-5 col-xl-4 col-xxl-3 mt-4'>
                        <div className='p-3 justify-content-center text-center'>
                            <img src={Image} className="rounded-circle w-50 img-responsive" alt="profilePicture" />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='bg-info p-2 d-inline-block rounded-3'>
                                <h5 className='m-0 ps-5 pe-5 text-light'>{userRole}</h5>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-12 col-lg-7 col-xl-8 col-xxl-9 mt-4'>
                        <div className='row'>
                            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                                <input placeholder='yahyasaad2024@gmail.com' type="email" className="form-control" name="email" onChange={handleChange} id="email" defaultValue={updatedFields.email ?? user.email} />
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                <label htmlFor="phoneNumber" className="form-label">رقم الهاتف</label>
                                <input placeholder='01127471188' type="tel" className="form-control" name="phoneNumber" onChange={handleChange} id="phoneNumber" defaultValue={updatedFields.phoneNumber ?? user.phoneNumber} />
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                <label htmlFor="governorate" className="form-label">المحافظة</label>
                                <input placeholder='قنا' type="text" className="form-control" name="governorate" onChange={handleChange} id="governorate" defaultValue={updatedFields.governorate ?? user.governorate} />
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                <label htmlFor="state" className="form-label">المركز / المدينة</label>
                                <input placeholder='قوص' type="text" className="form-control" name="state" onChange={handleChange} id="state" defaultValue={updatedFields.state ?? user.state} />
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                <label htmlFor="street" className="form-label">القرية / الشارع</label>
                                <input placeholder='طريق الشوادر بجوار قاعة شهرزاد' type="text" className="form-control" name="street" onChange={handleChange} id="street" defaultValue={updatedFields.street ?? user.street} />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <Btn name='تحديث البيانات' class='btn-primary w-50' onClick={updateUser} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;