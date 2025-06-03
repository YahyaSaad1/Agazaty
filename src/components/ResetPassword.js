import { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL, token } from "../server/serves";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
        setError("كلمة المرور وتأكيدها غير متطابقتين");
        setLoading(false);
        return;
        }

        const email = localStorage.getItem("otpEmail");
        if (!email) {
        setError("لم يتم العثور على البريد الإلكتروني، أعد المحاولة من البداية");
        setLoading(false);
        return;
        }

        try {
        const response = await axios.put(`${BASE_API_URL}/api/Account/Reset-Password`,
            {
            email: email,
            newPassword: password,
            },
            {
            headers: {
                accept: "/",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );

        localStorage.removeItem("otpEmail");
        navigate("/");
        } catch (err) {
        setError(
            err.response?.data?.message ||
            "فشل إعادة تعيين كلمة المرور، حاول مرة أخرى"
        );
        console.error("Reset Password error:", err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="wordLogin">
            <h4 className="text-center text-head text-bold">إعادة تعيين كلمة المرور</h4>
        </div>

        {error && (
            <div className="alert alert-danger p-2" role="alert">
                {error}
            </div>
        )}

        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-600">
            كلمة المرور الجديدة
            </label>
            <div style={{ position: "relative" }}>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="مثال: *YahyaSaad123"
                required
            />
            {password && (
                <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                }}
                />
            )}
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label text-600">
            تأكيد كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
            <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword2"
                placeholder="مثال: *YahyaSaad123"
                required
            />
            {confirmPassword && (
                <FontAwesomeIcon
                icon={showConfirm ? faEyeSlash : faEye}
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                }}
                />
            )}
            </div>
        </div>

        <div className="d-flex justify-content-center">
            <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            >
            {loading ? "جاري الحفظ..." : "تسجيل الدخول"}
            </button>
        </div>
        </form>
    );
}

export default ResetPassword;