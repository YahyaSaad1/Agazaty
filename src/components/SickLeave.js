import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../Data" ;

function SickLeave() {
    const userID = localStorage.getItem("userID");
    const [disease, setDisease] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [governorate, setGovernorate] = useState("");

    const handleData = async (e) => {
        e.preventDefault();

        if ( !disease || !street || !governorate || !governorate || !state || !userID ) {
            Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }
        const leaveData = {
            disease: disease,
            street: street,
            governorate: governorate,
            state: state,
            userID: userID,
        };

        try {
            const response = await fetch(
                `http://agazatyapi.runasp.net/api/SickLeave/CreateSickLeave`,
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
                <h2 className="m-0">طلب اجازة مرضية</h2>
            </div>

            <form onSubmit={handleData}>
                    <div className="row">
                        {/* <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                المرض
                            </label>
                            <textarea
                                className="form-control"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="اكتب المرض"
                            ></textarea>
                        </div> */}

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                سبب البلاغ
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="مثال: صداع"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                المحافظة
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={governorate}
                                onChange={(e) => setGovernorate(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="قنا"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                المركز / المدينة
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="قوص"
                            />
                        </div>

                        <div className="col-sm-12 col-md-6 mt-3">
                            <label htmlFor="notes" className="form-label">
                                القرية / الشارع
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                id="notes"
                                rows="1"
                                placeholder="طريق الشوادر بجوار قاعة شهرزاد"
                            />
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

export default SickLeave;