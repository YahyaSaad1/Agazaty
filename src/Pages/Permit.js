import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Permit() {
    const [Hours, setHours] = useState("");
    const [file, setFile] = useState(null); // تغييرها إلى متغير واحد فقط لتخزين صورة واحدة
    const [filePreview, setFilePreview] = useState(null); // لتخزين صورة المعاينة
    const [startDate, setStartDate] = useState("");
    const [UserId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/Account/GetAllActiveUsers`)
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        return () => {
            if (filePreview) URL.revokeObjectURL(filePreview); // إلغاء رابط المعاينة عند إلغاء تحميل الصورة
        };
    }, [filePreview]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // السماح بتحميل صورة واحدة فقط
        setFile(selectedFile);

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
        }
    };

    const handleData = async (e) => {
        e.preventDefault();

        if (!file || !Hours || !UserId || !startDate) {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }

        // نافذة التأكيد قبل إرسال الطلب
        const result = await Swal.fire({
            title: "هل أنت متأكد؟",
            text: "هل ترغب في إرسال طلب التصريح الآن؟",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "نعم، إرسال الطلب",
            cancelButtonText: "لا، تعديل البيانات",
        });

        if (result.isConfirmed) {
            // إذا وافق المستخدم على الإرسال
            const formData = new FormData();
            formData.append("Hours", Hours);
            formData.append("UserId", UserId);
            formData.append("Date", startDate);
            formData.append("file", file); // إرسال ملف واحد فقط

            try {
                const response = await fetch(
                    "http://agazatyapi.runasp.net/api/PermitLeave/CreatePermitLeave",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const responseData = await response.json();

                if (!response.ok) {
                    Swal.fire("خطأ!", `فشل إرسال الطلب: ${responseData.message || "يرجى المحاولة لاحقًا"}`, "error");
                } else {
                    Swal.fire("نجحت!", `تم إرسال الطلب: ${responseData.message || "يرجى انتظار الموافقة"}`, "success");
                }
            } catch (error) {
                Swal.fire("خطأ!", "حدث خطأ أثناء إرسال الطلب", "error");
                console.error("Error:", error);
            }
        }
    };

    return (
        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">تصريح لموظف</h2>
            </div>

            <form onSubmit={handleData} encType="multipart/form-data">
                <div className="row">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="Hours" className="form-label">عدد ساعات التصريح</label>
                        <input
                            type="number"
                            value={Hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="مثال: 3"
                            className="form-control"
                            id="Hours"
                            required
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="startDate" className="form-label">تاريخ التصريح</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-control"
                            id="startDate"
                            required
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="coworker" className="form-label">اختر الموظف</label>
                        <select className="form-select" id="coworker" onChange={(e) => setUserId(e.target.value)} required>
                            <option value="">اختر الموظف</option>
                            {users.map((coworker, index) => (
                                <option key={index} value={coworker.id}>
                                    {coworker.fullName} ({coworker.departmentName})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="file" className="form-label">صورة التصريح</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control"
                            id="file"
                            required
                        />

                        {filePreview && (
                            <div className="mt-3">
                                <img
                                    src={filePreview}
                                    alt="معاينة التصريح"
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc" }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">إرسال الطلب</button>
                </div>
            </form>
        </div>
    );
}

export default Permit;
