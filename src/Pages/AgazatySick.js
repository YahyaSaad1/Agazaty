import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import API from "../Data" ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

function AgazatySick() {
    const userID = localStorage.getItem("userID");
    const [sickLeaves, setSickLeaves] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllSickLeavesByUserID/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setSickLeaves(data))
    }, [userID])

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
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>نوع الاجازة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ البدء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ الانتهاء</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>عدد الأيام</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>طباعة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sickLeaves.length > 0 ? (
                                sickLeaves.map((leave, index) => (
                                    <tr key={index}>
                                        <th>مرضية</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                        <th> {leave.days} أيام</th>
                                        {leave.respononseDone === true ? <th>مقبولة</th>
                                        : leave.respononseDone === false ? <th>مرفوضة</th>
                                        : <th>معلقة</th>
                                        }
                                        <th>
                                            <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        </th>
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/user/sick-leave-request' class="btn btn-outline-primary" />
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

export default AgazatySick;
