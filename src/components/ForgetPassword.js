import { useState } from 'react';
import '../CSS/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API_URL from '../server/serves';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${BASE_API_URL}api/Account/Forget-Password`,
                {
                    email: email
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Store email in localStorage as otpEmail
            localStorage.setItem('otpEmail', email);

            // Navigate to OTP code page
            navigate('/login/otpcode');

        } catch (err) {
            setError(err.response?.data?.message || 'فشل إرسال كود التحقق، حاول مرة أخرى');
            console.error('Forget Password error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePassword}>
            <div className='wordLogin'>
                <h4 className="text-center text-head">استرجاع كلمة المرور</h4>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">البريد الإلكتروني</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder='yahyasaad2024@gmail.com'
                    required
                />
            </div>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'جاري الإرسال...' : 'إرسال كود التحقق'}
                </button>
            </div>
        </form>
    );
}

export default ForgetPassword;