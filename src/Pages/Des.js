import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import API from "../Data" ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

function Des() {
    const [leaves, setLeaves] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetAllNormalLeaves`)
        .then((res)=> res.json())
        .then((data)=> setLeaves(data))
    }, [])

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">سجل الاجازات</h2>
                </div>
                <div className="p-3">
                    <div className="d-flex">
                        <BtnLink name='إضافة إجازة' link='/add-leave' class="btn btn-primary m-0 me-2" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>نوع الاجازة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ البدء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ الانتهاء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>عدد الأيام</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>القائم بالعمل</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>ملحوظات</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>طباعة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length > 0 ? (
                                leaves.map((leave, index) => (
                                    <tr key={index}>
                                        <th>اعتيادية</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                        <th>{leave.days} أيام</th>
                                        <th>{leave.coworkerName}</th>
                                        <th>{leave.notesFromEmployee}</th>
                                        <th>{leave.leaveStatus === 0 ? "معلقة" : leave.leaveStatus === 1 ? "مقبولة" : "مرفوضة"}</th>
                                        <th>
                                            <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        </th>
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/normal-leave-request' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-danger p-3">لا يوجد اجازات حتى الآن</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Des;
