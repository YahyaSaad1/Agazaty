import "../CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_API_URL, token } from "../server/serves";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCopy } from "@fortawesome/free-solid-svg-icons";

function LoginCom() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // بيانات التسجيل الافتراضية
    const demoUser = "30309092701066";
    const demoPass = "30309092701066";

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        const response = await axios.post(
            `${BASE_API_URL}/api/Account/UserLogin`,
            {
            userName: userName,
            password: password,
            },
            {
            headers: {
                accept: "/",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response.data.id);
        localStorage.setItem("roleName", response.data.roleName);
        localStorage.setItem("UserData", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
        } catch (err) {
        setError(
            err.response?.data?.message || "فشل تسجيل الدخول، حاول مرة أخرى"
        );
        } finally {
        setLoading(false);
        }
    };

    // نسخ البيانات وتعبئة الفورم تلقائيًا
    const handleCopyDemoData = () => {
        setUserName(demoUser);
        setPassword(demoPass);
        navigator.clipboard.writeText(`اسم المستخدم: ${demoUser}, كلمة المرور: ${demoPass}`);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="wordLogin">
                <h4 className="text-center text-head text-bold">تسجيل الدخول</h4>
            </div>

            {error && (
            <div className="alert alert-danger p-2" role="alert">
                {error}
            </div>
            )}

            <div className="mb-3">
            <label
                htmlFor="exampleInputUserName"
                className="form-label text-600"
            >
                اسم المستخدم
            </label>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                id="exampleInputUserName"
                placeholder="مثال: YahyaSaad"
                required
            />
            </div>

            <div className="mb-3 position-relative">
            <label
                htmlFor="exampleInputPassword1"
                className="form-label text-600"
            >
                كلمة المرور
            </label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="مثال: *YahyaSaad123"
                minLength={8}
                required
            />

            {password && (
                <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="position-absolute"
                style={{
                    top: "50%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                }}
                onClick={togglePasswordVisibility}
                />
            )}

            <div className="mt-2">
                <Link
                to={"/login/forgetpassword"}
                className="form-text text-primary forgetPassword"
                >
                هل نسيت كلمة المرور؟
                </Link>
            </div>
            </div>

            <div className="d-flex justify-content-center">
            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading ? "جاري التحميل..." : "تسجيل الدخول"}
            </button>
            </div>
        </form>

        {/* بيانات تسجيل الدخول للتجربة */}
        <div className="alert alert-info mt-3 text-center p-1" role="alert">
            <p className="mb-1 text-end">لتجربة تسجيل الدخول بحساب الـHR استخدم هذه البيانات:</p>
            {/* <p className="mb-1">
                <strong>اسم المستخدم:</strong> {demoUser}
            </p>
            <p className="mb-2">
                <strong>كلمة المرور:</strong> {demoPass}
            </p> */}
            <button
            onClick={handleCopyDemoData}
            className="btn btn-outline-primary btn-sm mb-1"
            >
            <FontAwesomeIcon icon={faCopy} className="me-2" />
                انسخ البيانات للتجربة
            </button>
            <p className="mb-1 text-end" style={{fontSize:'11.5px'}}>*للتسجيل بأي حساب يمكنك استخدام الرقم القومي للشخص من قسم الموظفين.</p>
        </div>
        </>
    );
}

export default LoginCom;
