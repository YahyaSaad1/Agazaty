import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_API_URL, roleName, token, UserData, userID } from "../server/serves";

function NormalLeave() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notesFromEmployee, setNotesFromEmployee] = useState("");
    const [coworkerID, setCoworkerID] = useState("");
    const [coworkers, setCoworkers] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/Account/GetAllAvailabelCoworkers/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setCoworkers(data);
                } else {
                    setCoworkers([]);
                }
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء جلب البيانات:", error);
            });
    }, [userID]);

    const handleData = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !userID || !coworkerID) {
        Swal.fire("خطأ!", "يرجى ملء جميع الحقول المطلوبة", "error");
        return;
    }

    const result = await Swal.fire({
        title: 'هل أنت متأكد من إرسال الطلب؟',
        text: "لا يمكن التراجع عن هذا الإجراء!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، إرسال',
        cancelButtonText: 'إلغاء',
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

    if (!result.isConfirmed) {
        return;
    }

    const leaveData = {
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        notesFromEmployee: notesFromEmployee || "",
        userID: userID.toString(),
        coworker_ID: coworkerID.toString(),
    };


    try {
        const response = await fetch(
            `${BASE_API_URL}/api/NormalLeave/CreateNormalLeave`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(leaveData),
            }
        );

        if (!response.ok) {
            let errorMessage = "يرجى المحاولة لاحقًا";
            try {
                const errorData = await response.json();
                console.error("API Error:", errorData);

                errorMessage =
                    errorData.error ||
                    errorData.message ||
                    errorData.messages ||
                    JSON.stringify(errorData);
            } catch (parseError) {
                console.error("Failed to parse error response:", parseError);
            }

            Swal.fire({
                title: "فشل إرسال الطلب!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "حسنًا",
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
                return;
        } else {
            const successData = await response.json();
            Swal.fire({
                title: "نجحت!",
                text: successData.messages || "يرجى انتظار الموافقة",
                icon: "success",
                confirmButtonText: "حسنًا",
                customClass: {
                    title: 'text-blue',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            }).then(() => {
                window.location.href = "agazaty2/normal";
            });
        }
    } catch (error) {
        Swal.fire({
            title: "خطأ!",
            text: "حدث خطأ أثناء إرسال الطلب",
            icon: "error",
            confirmButtonText: "حسنًا",
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
};

    const now = new Date();
    const today = new Date();
    const limitTime = new Date();

    if(roleName === "هيئة تدريس" || (roleName === "موظف" && UserData.posistion === 2)){
        limitTime.setHours(22, 31, 0, 0);
    } else{
        limitTime.setHours(7, 31, 0, 0);
    }

    if (now >= limitTime) {
        today.setDate(today.getDate() + 1);
    }
    const minDate = today.toISOString().split("T")[0];

    return (
        <div>
            <div className="zzz d-inline-block">
                <h2 className="m-0">طلب إجازة اعتيادية</h2>
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
                        min={minDate}
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
                        disabled={!startDate}
                        min={startDate || minDate}
                    />
                </div>



                    <div className="col-sm-12 col-md-6 mt-3">
                        <label htmlFor="coworker" className="form-label">القائم بالعمل</label>
                        <input
                            list="coworker-list"
                            className="form-control"
                            id="coworker"
                            placeholder="مثال: يحيى سعد عبدالموجود"
                            onChange={(e) => {
                            const selectedName = e.target.value;
                            const selectedCoworker = coworkers.find(coworker =>
                                `${coworker.fullName} (${coworker.departmentName})` === selectedName
                            );
                            setCoworkerID(selectedCoworker ? selectedCoworker.id : "");
                            }}
                            required
                        />
                        <datalist id="coworker-list" style={{ textAlign: 'right' }}>
                            {coworkers.map((coworker, index) => (
                            <option
                                key={index}
                                value={`${coworker.fullName} (${coworker.departmentName})`}
                            />
                            ))}
                        </datalist>
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

                    <div className="mt-5">
                        {startDate !== '' && 
                            <div className="mb-2">
                                <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1 ms-2" checked disabled />
                                <span>
                                    أقر بأنني أديت أعمالي المصلحية حتى يوم{' '}
                                    <span className="text-danger">{new Date(startDate).toLocaleDateString('ar-EG')} </span>
                                    وهو أخر أيام العمل الرسمية السابقة لابتداء الإجازة الأعتيادية المرخص لي بها وبيانها بعاليه.</span>
                                </label>
                            </div>
                        }
                        { endDate !== '' && 
                            <div>
                                <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1 ms-2" checked disabled />
                                <span>
                                    أقر بأنني استأنفت أعمالي المصلحية حتى يوم{' '}
                                    <span className="text-danger">{new Date(endDate).toLocaleDateString('ar-EG')} </span>
                                    وهو اليوم الأول من أيام العمل الرسمية بعد انتهاء الإجازة الأعتيادية المرخص لي بها وبيانها بعاليه.
                                </span>
                                </label>
                            </div>
                        }
                    </div>
                </div>




                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary w-50">
                        إرسال الطلب
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NormalLeave;
