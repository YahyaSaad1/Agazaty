import React, { useEffect, useState } from "react";
import BtnLink from "../components/BtnLink";
import API from "../Data" ;

function Des() {
    const [requestStatus, setRequestStatus] = useState('');
    const [requests, setRequests] = useState([]);

    return (
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">سجل الإجازات</h2>
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
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>الاسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>القسم</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>رقم الهاتف</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>نوع الإجازة</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>تاريخ البداية</th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>
                                    حالة الطلب
                                    <select onChange={(e) => setRequestStatus(e.target.value)} className="form-select w-75" aria-label="Default select example">
                                        <option value="الكل">الكل</option>
                                        <option value="اعتيادية">اعتيادية</option>
                                        <option value="عارضة">عارضة</option>
                                        <option value="مرضية">مرضية</option>
                                        <option value="تصريح">تصريح</option>
                                    </select>
                                </th>
                                <th scope="col" style={{ backgroundColor: '#F5F9FF' }}>الأرشيف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <tr key={index}>
                                        {request.employee.map((item, empIndex) => (
                                            <React.Fragment key={empIndex}>
                                                <td>{item.firstName} {item.secondName} {item.thirdName}</td>
                                                <td>{item.department}</td>
                                                <td>{item.phoneNumber}</td>
                                            </React.Fragment>
                                        ))}
                                        <td>{request.type}</td>
                                        <td>{request.startDate}</td>
                                        <td className={request.status === 'معلقة' ? "text-success" : "text-primary"}>{request.status}</td>
                                        <td>
                                            <BtnLink id={request.id} name='عرض الإجازة' link='/leave-requests' class="btn btn-outline-primary" />
                                        </td>
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
