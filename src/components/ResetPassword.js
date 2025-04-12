import { useState } from 'react';
import '../CSS/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API_URL from '../server/serves';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('كلمة المرور وتأكيدها غير متطابقتين');
            setLoading(false);
            return;
        }

        // Get email from localStorage
        const email = localStorage.getItem('otpEmail');
        if (!email) {
            setError('لم يتم العثور على البريد الإلكتروني، أعد المحاولة من البداية');
            setLoading(false);
            return;
        }
        console.log("password :", password)
        try {
            const response = await axios.put(
                `${BASE_API_URL}api/Account/Reset-Password`,
                {
                    email: email,
                    newPassword: password
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Password reset successful:', response.data);
            // Remove email from localStorage after success
            localStorage.removeItem('otpEmail');
            // Navigate to login page
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'فشل إعادة تعيين كلمة المرور، حاول مرة أخرى');
            console.error('Reset Password error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='wordLogin'>
                <h4 className="text-center text-head">إعادة تعيين كلمة المرور</h4>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور الجديدة</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder='********'
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">تأكيد كلمة المرور</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword2"
                    placeholder='********'
                    required
                />
            </div>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'جاري الحفظ...' : 'تسجيل الدخول'}
                </button>
            </div>
        </form>
    );
}

export default ResetPassword;