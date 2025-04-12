import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../Data" ;

function CasualLeave() {
    const userID = localStorage.getItem("userID");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleData = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !userID || !notes) {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }
        const leaveData = {
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            userID: userID.toString(),
            notes: notes.toString(),
        };

        try {
            const response = await fetch(
                "http://agazatyapi.runasp.net/api/CasualLeave/CreateCasualLeave",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(leaveData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                Swal.fire("خطأ!", `فشل إرسال الطلب: ${errorData.message || "يرجى المحاولة لاحقًا"}`, "error");
                return;
            }else {
                const errorData = await response.json();
                Swal.fire("نجحت!", `تم إرسال الطلب: ${errorData.message || "يرجى انتظار الموافقة"}`, "success");
            }
        } catch (error) {
            Swal.fire("خطأ!", "حدث خطأ أثناء إرسال الطلب", "error");
            console.error("Error:", error);
        }
    };

    return (

        <div>
            <div className="zzz d-inline-block p-3 ps-5">
                <h2 className="m-0">طلب اجازة عارضة</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="startDate" className="form-label">
                                تاريخ بداية الإجازة
                            </label>
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
                            <label htmlFor="endDate" className="form-label">
                                تاريخ نهاية الإجازة
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="form-control"
                                id="endDate"
                                required
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="notes" className="form-label">
                            الملاحظات
                        </label>
                        <textarea
                            className="form-control"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            id="notes"
                            rows="1"
                            placeholder="اكتب ملاحظاتك"
                        ></textarea>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary w-50">
                        إرسال الطلب
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CasualLeave;