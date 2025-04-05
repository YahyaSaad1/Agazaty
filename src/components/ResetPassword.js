import '../CSS/login.css';
import BtnLink from './BtnLink';
import { useState } from 'react';

function ResetPassword(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return(
        <form>
            <div className='wordLogin'>
                <h4 className="text-center text-head">إعادة تعيين كلمة المرور</h4>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور الجديدة</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='********' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">تأكيد كلمة المرور</label>
                <input type="password" onChange={(e)=> setConfirmPassword(e.target.value)} className="form-control" id="exampleInputPassword2" placeholder='********' />
            </div>
            <BtnLink name='تسجيل الدخول' link='/' class='btn-primary w-100'/>
        </form>
    )
}

export default ResetPassword;