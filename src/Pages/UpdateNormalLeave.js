import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateNormalLeave() {
    const userID = localStorage.getItem("userID");
    const [user, setUser] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetAllwaitingNormalLeaves`)
        .then((res)=> res.json())
        .then((data)=> setUser(data))
    }, [userID])

    const leaveID = useParams().leaveID;
    const [endDate, setEndDate] = useState("");
    const [notesFromEmployee, setNotesFromEmployee] = useState("");

    const handleData = async (e) => {
        e.preventDefault();

        if (!leaveID || !endDate || !notesFromEmployee) {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }
        const leaveData = {
            startDate: leaveID.toString(),
            endDate: endDate.toString(),
            notesFromEmployee: notesFromEmployee || "",  // تأكد من أنها ليست `null`
        };

        try {
            const response = await fetch(
                `http://agazatyapi.runasp.net/api/NormalLeave/UpdateNormalLeave/${leaveID}`,
                {
                    method: "PUT",
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
                <h2 className="m-0">كسر اجازة #{leaveID}</h2>
            </div>

            <form onSubmit={handleData}>
                <div className="row">
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
                            value={notesFromEmployee}
                            onChange={(e) => setNotesFromEmployee(e.target.value)}
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

export default UpdateNormalLeave;