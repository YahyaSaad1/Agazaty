import { useState } from "react";
import Swal from "sweetalert2";
import API from "../Data" ;
function Parameter() {
    const [Hours, setHours] = useState("");
    const [files, setFiles] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [UserId, setUserId] = useState("");

    const handleData = async (e) => {
        e.preventDefault();

        if (!files.length || !Hours || !UserId || !startDate) {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }

        const formData = new FormData();
        formData.append("Hours", Hours);
        formData.append("UserId", UserId);
        formData.append("Date", startDate);

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

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
                        <label htmlFor="UserId" className="form-label">كود الموظف</label>
                        <input
                            type="text"
                            className="form-control"
                            value={UserId}
                            onChange={(e) => setUserId(e.target.value)}
                            id="UserId"
                            placeholder="ادخل كود الموظف"
                            required
                        />
                    </div>

                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="files" className="form-label">المرفقات</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFiles(e.target.files)}
                            className="form-control"
                            id="files"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">إرسال الطلب</button>
                </div>
            </form>
        </div>
    );
}

export default Parameter;
