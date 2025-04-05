import '../CSS/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from "../Data" ;

function LoginCom() {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        setError('');

        const loginData = {
            UserName: UserName,
            Password: Password
        };

        try {
            const response = await fetch(`http://agazatyapi.runasp.net/api/Account/UserLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'فشل تسجيل الدخول');
            }
            
            console.log('تم تسجيل الدخول بنجاح:', data);
            console.log('تسجيل ناجح');
            localStorage.setItem('userToken', data.token);
            
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='wordLogin'>
                    <h4 className="text-center text-head">تسجيل الدخول</h4>
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="mb-3">
                    <label htmlFor="exampleInputText" className="form-label">البريد الإلكتروني</label>
                    <input type="text" value={UserName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="exampleInputText" placeholder='example@gmail.com' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور</label>
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='********' required />
                    <Link to={'/login/forgetpassword'} className="form-text text-primary forgetPassword">هل نسيت كلمة المرور؟</Link>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className='btn btn-primary w-100'>تسجيل الدخول</button>
                </div>
            </form>
        </>
    );
}

export default LoginCom;