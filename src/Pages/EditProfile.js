import { useNavigate } from 'react-router-dom';
import Btn from '../components/Btn';
import { useEffect, useState } from 'react';
import YahyaSaad from '../Images/YahyaSaad.jpg';
import Swal from 'sweetalert2';
import API from "../Data" ;

function EditProfile(){
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    const [updatedFields, setUpdatedFields] = useState({});
    const [user, setUser] = useState([]);
    const [UserRole, setUserRole] = useState("");
    
    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetRoleOfUser/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setUserRole(data.role))
    }, [userID])
    
    useEffect(() => {
        if (userID) {
            fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [userID]);


    const handleChange = (e) => {
        setUpdatedFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value || user[e.target.name], // إذا لم يتم تغيير القيمة، استخدم القيمة القديمة
        }));
    };
    

    const updateUser = async (e) => {
        e.preventDefault();
    
        // التأكد من أن البيانات تحتوي على القيم القديمة إذا لم يتم تغييرها
        const finalData = {
            email: updatedFields.email || user.email,
            phoneNumber: updatedFields.phoneNumber || user.phoneNumber,
            governorate: updatedFields.governorate || user.governorate,
            state: updatedFields.state || user.state,
            street: updatedFields.street || user.street,
        };
    
        if (finalData.email === user.email && finalData.phoneNumber === user.phoneNumber && finalData.governorate === user.governorate && finalData.state === user.state && finalData.street === user.street) {
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
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalData),
                    });
    
                    if (response.ok) {
                        Swal.fire({
                            title: `<span style='color:#0d6efd;'>تم تحديث بياناتك بنجاح.</span>`,
                            icon: "success",
                            confirmButtonText: "حسنًا",
                            confirmButtonColor: "#0d6efd",
                        }).then(() => {
                            navigate("/profile");
                        });
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
    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form submitted');
    //     navigate('/');
    // };



    return(
        <div>
            <div className="d-flex mb-4">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">تعديل الملف الشخصي</h2>
                </div>
            </div>
            <div>
                <form onSubmit={updateUser}>
                    <div className='d-flex row align-items-center'>
                        <div className='col-sm-12 col-md-12 col-lg-5 col-xl-4 col-xxl-3 mt-4'>
                            <div className='p-3 justify-content-center text-center'>
                                <img src={YahyaSaad} className="rounded-circle w-50 img-responsive" alt="profilePicture" />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='bg-info p-2 d-inline-block rounded-3'>
                                    <h5 className='m-0 ps-5 pe-5 text-light'>{UserRole}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-7 col-xl-8 col-xxl-9 mt-4'>
                            <div className='row'>
                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">البريد الإلكتروني</label>
                                    <input type="email" className="form-control" name="email" onChange={handleChange} id="exampleInputEmail1" value={updatedFields.email ?? user.email} />
                                    </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputPhoneNumber" className="form-label">رقم الهاتف</label>
                                    <input type="tel" className="form-control" name="phoneNumber" onChange={handleChange} id="exampleInputPhoneNumber" value={updatedFields.phoneNumber ?? user.phoneNumber} />
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputGovernorate" className="form-label">المحافظة</label>
                                    <input type="text" className="form-control" name="governorate" onChange={handleChange} id="exampleInputPhoneNumber" value={updatedFields.governorate ?? user.governorate} />
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputState" className="form-label">المركز / المدينة</label>
                                    <input type="text" className="form-control" name="state" onChange={handleChange} id="exampleInputPhoneNumber" value={updatedFields.state ?? user.state} />
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputStreet" className="form-label">القرية / الشارع</label>
                                    <input type="text" className="form-control" name="street" onChange={handleChange} id="exampleInputPhoneNumber" value={updatedFields.street ?? user.street} />
                                </div>

                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                        <Btn name='تحديث البيانات' class='btn-primary w-50' onClick={updateUser} />

                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default EditProfile;