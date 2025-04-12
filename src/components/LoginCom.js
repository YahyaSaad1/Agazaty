import '../CSS/login.css';
import { Link, useNavigate } from 'react-router-dom';
import BtnLink from "./BtnLink";
import { useState } from 'react';
import axios from 'axios';
import BASE_API_URL from '../server/serves';
function LoginCom() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [res, SetRes] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `http://agazatyapi.runasp.net/api/Account/UserLogin`,
                {
                    userName: userName,  // Assuming email is used as username
                    password: password
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );
            SetRes(response.data);
            // Handle successful login
            console.log('Login successful:', response.data);
            // You might want to store token or user data here
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userID', response.data.id);
            localStorage.setItem('UserData', JSON.stringify(response.data));
            
            // Redirect to home page
            navigate('/');

        } catch (err) {
            // Handle error          
            console.log('Login successful:', res);

            setError(err.response?.data?.message || 'فشل تسجيل الدخول، حاول مرة أخرى');
            console.error('Login error:', err);
        } finally {
            console.log('Login successful:', res);

            setLoading(false);
        }
        console.log('Login successful:', res);

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='wordLogin'>
                    <h4 className="text-center text-head">تسجيل الدخول</h4>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="exampleInputUserName" className="form-label">اسم المستخدم</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="form-control"
                        id="exampleInputUserName"
                        aria-describedby="emailHelp"
                        placeholder='30201241234567'
                        required
                        maxLength={14}
                        minLength={14}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder='********'
                        required
                    />
                    <Link to={'/login/forgetpassword'} id="emailHelp" className="form-text text-primary forgetPassword">
                        هل نسيت كلمة المرور؟
                    </Link>
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                    </button>
                </div>
            </form>
        </>
    );
}

export default LoginCom;