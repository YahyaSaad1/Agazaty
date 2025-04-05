import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/PreviousRequests.css';
import { faPlus, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BtnLink from './BtnLink';
import API from "../Data" ;

function PreviousRequests({leaves}) {
    const userID = localStorage.getItem("userID");
    const [LeaveTypes, setLeaveTypes] = useState([]);
    const [NormalLeaves, setNormalLeaves] = useState([]);
    const [leave, setlLeave] = useState("");

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetLeaveTypes`)
        .then((res)=> res.json())
        .then((data)=> setLeaveTypes(data))
    }, [])

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/AllNormalLeavesByUserId/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setNormalLeaves(data))
    }, [userID])

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h4>اجازاتك السابقة</h4>
                <div className='d-flex'>
                    <div className='d-flex btn btn-primary align-items-center me-2'>
                        <FontAwesomeIcon icon={faCalendarDays} className="pl-3" />
                        <select
                            className='bg-primary border-0 text-light'
                            value={leave || "اعتيادية"}
                            onChange={(e) => setlLeave(e.target.value)}
                            aria-label="Default select example"
                        >
                            {LeaveTypes.map((LeaveType, index)=>{
                                return(
                                    <option key={index} value={LeaveType}>{LeaveType}</option>
                                )
                            })}
                        </select>
                    </div>
                    <Link to={'/leave-request'} className='btn btn-primary me-2'>
                        <FontAwesomeIcon icon={faPlus} className="pl-3" />
                        <span>اجازة جديدة</span>
                    </Link>
                </div>
            </div>
            <div className='box-private mt-2'>
                <table className="m-0 table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">نوع الاجازة</th>
                            <th scope="col">تاريخ البدء</th>
                            <th scope="col">عدد الأيام</th>
                            <th scope="col">القائم بالعمل</th>
                            <th scope="col">ملحوظات</th>
                            <th scope="col">حالة الطلب</th>
                            <th scope="col">الأرشيف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NormalLeaves.map((leave, index) => (
                                <tr key={index}>
                                    <th>اعتيادية</th>
                                    <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                    <th> {leave.days} أيام</th>
                                    <th>{leave.coworkerName}</th>
                                    <th>{leave.notesFromEmployee}</th>
                                    <th>
                                        {leave.holder === 0 ? <span className='text-primary cursor-pointer' title={leave.coworkerName}>القائم بالعمل</span>
                                        : leave.holder === 1 ? <span className='text-primary cursor-pointer' title={leave.directManagerName}>المدير المباشر</span>
                                        : leave.holder === 2 ? <span className='text-primary cursor-pointer' title={leave.generalManagerName}>المدير المختص</span>
                                        : <span title={"تمت"} className='text-primary cursor-pointer'>مقبولة</span>}
                                    </th>
                                    <td>
                                        <BtnLink id={leave.id} name='عرض الاجازة' link={`/normal-leave-request`} class="btn btn-outline-primary" />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PreviousRequests;
