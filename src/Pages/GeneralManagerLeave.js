import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import Search from "../components/Search";
import API from "../Data" ;

function GeneralManagerLeave(){
    const userID = localStorage.getItem("userID");
    const [leavesWating, setLeavesWating] = useState([]);



    
    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWating(data))
    }, []);

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">طلبات الاجازات</h2>
                </div>
                <div className="p-3">
                    <div className="d-flex">
                        <Search />
                        <BtnLink name='إضافة اجازة' link='/add-leave' class="btn btn-primary m-0 me-2"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className="m-0 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>المرجع</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الاسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>القسم</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>رقم الهاتف</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>نوع الاجازة</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ البداية</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ النهاية</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>عدد الأيام</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>

                            {leavesWating.map((leave, index)=>{
                                return(
                                    <tr key={index}>
                                        <th>{leave.id}#</th>
                                        <th>{leave.userName}</th>
                                        <th>{leave.department}</th>
                                        <th>{leave.phoneNumber}</th>
                                        <th>اعتيادية</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                        <th>{leave.days} أيام</th>
                                        { leave.leaveStatus === 0 && <th className="text-danger">معلقة</th>}
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/general-manager/normal-leave-request' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GeneralManagerLeave;