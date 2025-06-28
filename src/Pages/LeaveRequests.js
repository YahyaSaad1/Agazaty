import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import Btn from "../components/Btn";
import '../CSS/LeaveRequests.css';
import { useParams } from "react-router-dom";

function LeaveRequests(){

    const employeeID = 1;
    const LeaveID = useParams().id;
    const [employee, setEmployee] = useState([]);
    const [leave, setLeave] = useState([]);

    // useEffect(() => {
    //     if (LeaveID) {
    //         fetch(`http://localhost:9000/employees/${employeeID}`)
    //             .then((res) => res.json())
    //             .then((data) => setLeave(data.leavess[2]))
    //     }
    // }, [LeaveID])

    useEffect(() => {
        if (LeaveID) {
            fetch(`http://localhost:9000/requests`)
                .then((res) => res.json())
                .then((data) => setLeave(data[LeaveID]))
        }
    }, [LeaveID])


    useEffect(() => {
        if (employeeID) {
            fetch(`http://localhost:9000/requests`)
                .then((res) => res.json())
                .then((data) => setEmployee(data[LeaveID].employee))
        }
    }, []);

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0">طلب إجازة ...</h2>
                </div>
                <div className="p-3">
                    <BtnLink name='إضافة إجازة' link='/add-leave' className="btn btn-primary m-0 ms-2 mb-2"/>
                    <BtnLink name='سجل الإجازات' link='/leave-record' className="btn btn-primary m-0 ms-2 mb-2"/>
                </div>
            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <table className="m-0 table table-striped box2">
                        <thead>
                            <tr>
                                <th scope="col" className="pb-3" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                                <th scope="col"  className="text-start" style={{backgroundColor:'#F5F9FF'}}>
                                    <Btn name={leave.status} className="btn-warning text-start"  />
                                </th>
                            </tr>
                        </thead>
                        {employee.map((item, index)=>{
                            return(
                                <tbody key={index}>
                                <tr>
                                    <th scope="col">اسم الموظف</th>
                                    <th scope="col" className="text-start">{item.firstName} {item.secondName} {item.thirdName} {item.fourthName}</th>
                                </tr>
                                <tr>
                                    <th scope="col">نوع الإجازة</th>
                                    <th scope="col" className="text-start">{leave.type}</th>
                                </tr>
                                <tr>
                                    <th scope="col">رقم الهاتف</th>
                                    <th scope="col" className="text-start">{item.phoneNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</th>
                                </tr>
                                <tr>
                                    <th scope="col">القسم</th>
                                    <th scope="col" className="text-start">{item.department}</th>
                                </tr>
                                <tr>
                                    <th scope="col">القائم بالعمل</th>
                                    <th scope="col" className="text-start">{leave.coworker}</th>
                                </tr>
                                <tr>
                                    <th scope="col">تاريخ بداية الإجازة</th>
                                    <th scope="col" className="text-start">{leave.startDate}</th>
                                </tr>
                                <tr>
                                    <th scope="col">تاريخ نهاية الإجازة</th>
                                    <th scope="col" className="text-start">{leave.endDate}</th>
                                </tr>
                                <tr>
                                <th scope="col">الملحوظات</th>
                                    <th scope="col" className="text-start">{leave.notes}</th>
                                </tr>
                                <tr>
                                    <th scope="col">المرجع</th>
                                    <th scope="col" className="text-start">#{leave.id}</th>
                                </tr>
                                <tr>
                                    <th colSpan={2} className="text-center" style={{backgroundColor:'white'}}>
                                        <Btn name='موافقة' className='btn-success w-25 ms-2' />
                                        <Btn name='رفض' className='btn-danger w-25' />
                                    </th>
                                </tr>
                            </tbody>
                            )
                        })}
                    </table>
                    <div className="d-flex justify-content-center mt-4">
                        <BtnLink id={LeaveID} link='/leave-requests' name='السابق' className='btn-outline-primary w-50 ms-2' />
                        <BtnLink id={LeaveID} link='/leave-requests' name='التالي' className='btn-outline-primary w-50 ms-2' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveRequests;