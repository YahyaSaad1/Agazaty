import { useState } from 'react';
import '../CSS/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API_URL from '../server/serves';

function OTPCode() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to hold 6 OTP digits
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [res, SetRes] = useState([]);

    const handleOtpChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) { // Allow only single digits or empty
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input if a digit is entered
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const email = localStorage.getItem('otpEmail'); // Get email from localStorage
        const enteredOtp = otp.join(''); // Combine OTP digits into a single string

        if (!email) {
            setError('لم يتم العثور على البريد الإلكتروني، أعد المحاولة من البداية');
            setLoading(false);
            return;
        }

        if (enteredOtp.length !== 6) {
            setError('يرجى إدخال كود تحقق مكون من 6 أرقام');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_API_URL}api/Account/Verify-OTP`,
                {
                    email: email,
                    enteredOtp: enteredOtp
                },
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('OTP verification successful:', response.data);
            // Navigate to reset password page
            navigate('/login/resetpassword');

        } catch (err) {
            setError(err.response?.data?.message || 'فشل التحقق من الكود، حاول مرة أخرى');
            console.error('OTP verification error:', err);
            setOtp(['', '', '', '', '', '']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='wordLogin'>
                <h4 className="text-center text-head">لقد أرسلنا كود التحقق</h4>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="otp-input-0" className="form-label">كود التحقق</label>
                <div className="otp-container " style={{ "direction": 'ltr' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            id={`otp-input-${index}`}
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            maxLength="1"
                            placeholder={index % 2 === 0 ? '8' : '1'} // Just for demo purposes
                            required
                        />
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'جاري التحقق...' : 'استمرار'}
                </button>
            </div>
        </form>
    );
}

export default OTPCode;