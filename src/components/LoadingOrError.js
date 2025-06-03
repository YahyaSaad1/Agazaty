import { FaRegFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoadingOrError = ({ data, btnTitle, btnLink }) => {
    if (data === null) {
        return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
        >
            <div className="position-relative" style={{ width: "4rem", height: "4rem" }}>
            <div className="spinner-border text-primary w-100 h-100" role="status"></div>
            <div
                className="position-absolute top-50 start-50 translate-middle text-primary fw-bold"
                style={{ fontSize: "0.75rem" }}
            >
                انتظر...
            </div>
            </div>
        </div>
        );
    }

    if (!data || data.length === 0) {
        return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-muted"
            style={{ minHeight: "60vh" }}
        >
            <FaRegFolderOpen size={60} className="mb-3 text-secondary" />
            <h5>لا توجد بيانات متاحة حاليًا</h5>
            <p className="text-sm text-center">يبدو أنه لم يتم تسجيل أي بيانات هنا حتى الآن.</p>

            {btnTitle && btnLink && (
            <Link to={btnLink} className="btn btn-primary mt-3">
                {btnTitle}
            </Link>
            )}
        </div>
        );
    }

    return null;
};

export default LoadingOrError;
