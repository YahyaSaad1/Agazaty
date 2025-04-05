import { useState } from 'react';
import '../CSS/login.css';
import BtnLink from './BtnLink';

function ForgetPassword(){
    const [email, setEmail] = useState('');
    
    const handlePassword = (e)=>{
        e.preventDefault();
        console.log(email)
    }

    return(
        <form onSubmit={handlePassword}>
            <div className='wordLogin'>
                <h4 className="text-center text-head">استرجاع كلمة المرور</h4>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"> البريد الإلكتروني</label>
                <input type="email" onChange={(e)=> setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='yahyasaad2024@gmail.com' />
            </div>
            <BtnLink name='إرسال كود التحقق' link='/login/otpcode' class='btn-primary w-100'/>
        </form>
    )
}

export default ForgetPassword;