import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import API from "../Data" ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

function DesPermits() {
    const [permitLeaves, setPermitLeaves] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/PermitLeave/GetAllPermitLeaves`)
        .then((res)=> res.json())
        .then((data)=> setPermitLeaves(data))
    }, [])

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">سجل التصاريح</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>المرجع</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الاسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>التاريخ</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>عدد الساعات</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permitLeaves.length > 0 ? (
                                permitLeaves.map((permit, index) => (
                                    <tr key={index}>
                                        <th>#{permit.id}</th>
                                        <th>{permit.userName}</th>
                                        <th>{new Date(permit.date).toLocaleDateString()}</th>
                                        <th> {permit.hours} ساعة</th>
                                        <th>
                                            <BtnLink id={permit.id} name='عرض التصريح' link='/permit-leave' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-danger p-3">لا يوجد تصاريح حتى الآن</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DesPermits;
