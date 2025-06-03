import React from "react";
import { Link } from "react-router-dom";

function Errorr() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">الصفحة غير موجودة</h2>
            <p className="mb-6 text-gray-600 text-center max-w-md">
                عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة. ربما تم نقلها أو حذفها.
            </p>
            <Link to="/" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                العودة إلى الصفحة الرئيسية
            </Link>
        </div>
    );
}

export default Errorr;
