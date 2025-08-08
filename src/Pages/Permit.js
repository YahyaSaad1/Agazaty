import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_API_URL, token, validate } from "../server/serves";

function Permit() {
    const [Hours, setHours] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [UserId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/Account/GetAllActiveUsers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
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

    const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لا يمكن التراجع عن هذا الإجراء!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "نعم، إرسال",
        cancelButtonText: "لا، تعديل البيانات",
        customClass: {
            title: 'text-blue',
            confirmButton: 'blue-button',
            cancelButton: 'red-button'
        },
        didOpen: () => {
            const popup = document.querySelector('.swal2-popup');
            if (popup) popup.setAttribute('dir', 'rtl');
        }
    });

    if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("Hours", Hours);
        formData.append("UserId", UserId);
        formData.append("Date", startDate);
        formData.append("file", file);

        try {
            const response = await fetch(
                `${BASE_API_URL}/api/PermitLeave/CreatePermitLeave`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                Swal.fire({
                    title: "فشل الإرسال!",
                    text: `${responseData.message || "يرجى المحاولة لاحقًا"}`,
                    icon: "error",
                    confirmButtonText: "حسناً",
                    customClass: {
                        title: 'text-red',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                });
            } else {
                Swal.fire({
                    title: "نجحت!",
                    text: `${responseData.message || "تم إضافة التصريح بنجاح"}`,
                    icon: "success",
                    confirmButtonText: "حسناً",
                    customClass: {
                        title: 'text-blue',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "خطأ!",
                text: "حدث خطأ أثناء الإرسال",
                icon: "error",
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            console.error("Error:", error);
        }
    }
};

    return (
        <div>
            <div className="zzz d-inline-block">
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
                            placeholder="حد أقصى 3 ساعات"
                            className="form-control"
                            id="Hours"
                            required
                            max={3}
                            onInput={() => validate("Hours", "عدد الساعات يجب أن يكون أقل من أو يساوي ثلاث ساعات", 3)}
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
                        <label htmlFor="user" className="form-label">اختر الموظف</label>
                        <input
                            className="form-control"
                            list="usersList"
                            id="user"
                            name="user"
                            placeholder="مثال: يحيى سعد عبدالموجود"
                            onChange={(e) => {
                            const selectedUser = users.find(user =>
                                `${user.fullName} (${user.departmentName})` === e.target.value
                            );
                            setUserId(selectedUser ? selectedUser.id : '');
                            }}
                            required
                        />
                        <datalist id="usersList">
                            {users.map((user, index) => (
                            <option
                                key={index}
                                value={`${user.fullName} (${user.departmentName})`}
                            />
                            ))}
                        </datalist>
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
