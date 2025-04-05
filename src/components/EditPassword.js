import { useNavigate } from 'react-router-dom';
import Btn from '../components/Btn';
import { useEffect, useState } from 'react';
import YahyaSaad from '../Images/YahyaSaad.jpg';
import Swal from 'sweetalert2';
import API from "../Data" ;

function EditPassword(){
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    const [updatedFields, setUpdatedFields] = useState({});
    const [UserRole, setUserRole] = useState("");

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetRoleOfUser/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setUserRole(data.role))
    }, [userID])


    // const [currentPassword, SetCurrentPassword] = useState('');
    // const [newPassword, SetNewPassword] = useState('');
    // const [confirmNewPassword, SetConfirmNewPassword] = useState('');


    const handleChange = (e) => {
        setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        navigate('/');
    };



    return(
        <div>
            <div className="d-flex mb-4">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">تعديل كلمة المرور</h2>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
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
                                    <label htmlFor="exampleInputCurrentPassword" className="form-label">كلمة المرور الحالية</label>
                                    <input type="text" className="form-control" onChange={handleChange} id="exampleInputCurrentPassword" aria-describedby="addressHelp" placeholder='********' />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputNewPassword" className="form-label">كلمة المرور الجديدة</label>
                                    <input type="text" className="form-control" onChange={handleChange} id="exampleInputNewPassword" aria-describedby="addressHelp" placeholder='********' />
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="exampleInputConfirmNewPassword" className="form-label">تأكيد كلمة المرور</label>
                                    <input type="text" className="form-control" onChange={handleChange} id="exampleInputConfirmNewPassword" aria-describedby="addressHelp" placeholder='********' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Btn name='تحديث البيانات' class='btn-primary w-50' />
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default EditPassword;