import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL, token } from "../server/serves";

function DesPermit() {
    const [permitLeaves, setPermitLeaves] = useState([]);

    useEffect(() => {
    fetch(`${BASE_API_URL}/api/PermitLeave/GetAllPermitLeave`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => setPermitLeaves(data))
        .catch((err) => console.error("Error fetching permit leaves:", err));
    }, []);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">سجل الاجازات المرضية</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الاسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ البدء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ الانتهاء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>عدد الأيام</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>طباعة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permitLeaves.length > 0 ? (
                                permitLeaves.map((leave, index) => (
                                    <tr key={index}>
                                        <th>{leave.userName}</th>
                                        {leave.startDate === "0001-01-01T00:00:00" ? <th className="text-danger">لم يحدد بعد</th>
                                        :<th>{new Date(leave.startDate).toLocaleDateString('ar-EG')}</th>}

                                        {leave.endDate === "0001-01-01T00:00:00" ? <th className="text-danger">لم يحدد بعد</th>
                                        :<th>{new Date(leave.endDate).toLocaleDateString('ar-EG')}</th>}

                                        {leave.days === null ? <th className="text-danger">لم يُحتسب بعد</th>
                                        :<th>{leave.days.toString().replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit])} أيام</th>
}
                                        {leave.certified === true
                                            ? <th className="text-success">مقبولة</th>
                                            : (leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === false)
                                            ? <th className="text-primary">معلقة عند التحديث الأول</th>
                                            : (leave.responseDoneFinal === false && leave.respononseDoneForMedicalCommitte === true)
                                            ? <th className="text-primary">معلقة عند التحديث الثاني</th>
                                            : <th className="text-danger">مرفوضة</th>
                                        }
                                        <th>
                                            <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        </th>
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/sick-leave-request' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-danger p-3">لا يوجد تصاريح حتى الآن</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DesPermit;
