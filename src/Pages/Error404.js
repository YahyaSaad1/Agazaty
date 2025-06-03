import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="fs-3"> <span className="text-danger">عذرًا ! </span>هذه الصفحة غير موجودة</p>
            <p className="lead">الصفحة التي تبحث عنها غير موجودة.</p>
            <button className="btn btn-primary p-2" onClick={handleBackHome}>
                الذهاب للصفحة الرئيسية
            </button>
        </div>
        </div>
    );
};

export default Error404;
