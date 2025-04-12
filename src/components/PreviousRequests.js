import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/PreviousRequests.css';
import { faPlus, faCalendarDays, faPrint } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BtnLink from './BtnLink';

function PreviousRequests({ leaves }) {
    const userID = localStorage.getItem("userID");
    const [LeaveTypes, setLeaveTypes] = useState([]);
    const [leaveType, setLeaveType] = useState('اعتيادية');
    const [normalLeaves, setNormalLeaves] = useState([]);
    const [casualLeaves, setCasualLeaves] = useState([]);
    const [sickLeaves, setSickLeaves] = useState([]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/CasualLeave/GetAllCasualLeavesByUserId/${userID}`)
            .then((res) => res.json())
            .then((data) => setCasualLeaves(Array.isArray(data) ? data : []));
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllSickLeavesByUserID/${userID}`)
            .then((res) => res.json())
            .then((data) => setSickLeaves(Array.isArray(data) ? data : []));
    }, [userID]);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/GetLeaveTypes`)
            .then((res) => res.json())
            .then((data) => setLeaveTypes(data));
    }, []);

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/AllNormalLeavesByUserId/${userID}`)
            .then((res) => res.json())
            .then((data) => setNormalLeaves(Array.isArray(data) ? data : []));
    }, [userID]);

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h4>اجازاتك السابقة</h4>
                <div className='d-flex'>
                    <div className='d-flex btn btn-primary align-items-center me-2'>
                        <FontAwesomeIcon icon={faCalendarDays} className="pl-3" />
                        <select
                            className='bg-primary border-0 text-light'
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            aria-label="Default select example"
                        >
                            {LeaveTypes.map((LeaveType, index) => (
                                <option key={index} value={LeaveType}>{LeaveType}</option>
                            ))}
                        </select>
                    </div>
                    <Link to={'/normal-leave'} className='btn btn-primary me-2'>
                        <FontAwesomeIcon icon={faPlus} className="pl-3" />
                        <span>اجازة جديدة</span>
                    </Link>
                </div>
            </div>

            <div className='box-private mt-2'>
                {leaveType === 'اعتيادية' ? (
                    normalLeaves.length === 0 ? (
                        <p className='text-center text-muted mt-3'>لا يوجد اجازات اعتيادية لديك</p>
                    ) : (
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
                                {normalLeaves.slice(-5).map((leave, index) => (
                                    <tr key={index}>
                                        <th>اعتيادية</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{leave.days} أيام</th>
                                        <th>{leave.coworkerName}</th>
                                        <th>{leave.notesFromEmployee}</th>
                                        <th>
                                            {leave.holder === 0 ? <span className='text-primary cursor-pointer' title={leave.coworkerName}>القائم بالعمل</span>
                                                : leave.holder === 1 ? <span className='text-primary cursor-pointer' title={leave.directManagerName}>المدير المباشر</span>
                                                    : leave.holder === 2 ? <span className='text-primary cursor-pointer' title={leave.generalManagerName}>المدير المختص</span>
                                                        : <span className='text-primary cursor-pointer' title={"تمت"}>مقبولة</span>}
                                        </th>
                                        <td>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link={`/user/normal-leave-request`} class="btn btn-outline-primary" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : leaveType === 'عارضة' ? (
                    casualLeaves.length === 0 ? (
                        <p className='text-center text-muted mt-3'>لا يوجد اجازات عارضة لديك</p>
                    ) : (
                        <table className="m-0 table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">نوع الاجازة</th>
                                    <th scope="col">تاريخ البدء</th>
                                    <th scope="col">تاريخ الانتهاء</th>
                                    <th scope="col">عدد الأيام</th>
                                    <th scope="col">ملحوظة</th>
                                    <th scope="col">طباعة</th>
                                    <th scope="col">الأرشيف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casualLeaves.slice(-5).map((leave, index) => (
                                    <tr key={index}>
                                        <th>عارضة</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                        <th>{leave.days} أيام</th>
                                        <th>{leave.notes}</th>
                                        <th>
                                            <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        </th>
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/user/casual-leave-request' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : leaveType === 'مرضية' ? (
                    sickLeaves.length === 0 ? (
                        <p className='text-center text-muted mt-3'>لا يوجد اجازات مرضية لديك</p>
                    ) : (
                        <table className="m-0 table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">نوع الاجازة</th>
                                    <th scope="col">تاريخ البدء</th>
                                    <th scope="col">تاريخ الانتهاء</th>
                                    <th scope="col">عدد الأيام</th>
                                    <th scope="col">حالة الطلب</th>
                                    <th scope="col">طباعة</th>
                                    <th scope="col">الأرشيف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sickLeaves.slice(-5).map((leave, index) => (
                                    <tr key={index}>
                                        <th>مرضية</th>
                                        <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                        <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                        <th>{leave.days} أيام</th>
                                        <th>
                                            {leave.respononseDone === true ? "مقبولة"
                                                : leave.respononseDone === false ? "مرفوضة"
                                                    : "معلقة"}
                                        </th>
                                        <th>
                                            <FontAwesomeIcon icon={faPrint} fontSize={'26px'} color="blue" className="printer" />
                                        </th>
                                        <th>
                                            <BtnLink id={leave.id} name='عرض الاجازة' link='/user/sick-leave-request' class="btn btn-outline-primary" />
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : null}
            </div>
        </div>
    );
}

export default PreviousRequests;
