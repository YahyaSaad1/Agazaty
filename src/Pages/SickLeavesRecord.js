import { useEffect, useState } from "react"
import BtnLink from "../components/BtnLink";

function SickLeavesRecord(){
    const [sickLeavesWaiting, setSickLeavesWaiting] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllSickLeave`)
        .then((res)=> res.json())
        .then((data)=> setSickLeavesWaiting(data))
    }, [])

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">الاجازات المرضية</h2>
                </div>
            </div>
            <div>
            <table className="m-0 table table-striped">
                <thead>
                <tr>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>المرجع</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الاسم</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ الاخطار</th>
                        {/* <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ البدء</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>تاريخ الانتهاء</th> */}
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>العنوان</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة الطلب</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>حالة المرض</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الأرشيف</th>
                    </tr>
                </thead>
                <tbody>
                    {sickLeavesWaiting.map((leave, index) => {
                        return(
                            <tr key={index}>
                                <th>#{leave.id}</th>
                                <th>{leave.userName}</th>
                                <th>{new Date(leave.requestDate).toLocaleDateString()}</th>
                                {/* <th>{new Date(leave.startDate).toLocaleDateString()}</th>
                                <th>{new Date(leave.endDate).toLocaleDateString()}</th>
                                <th> {leave.days} أيام</th> */}
                                <th>{leave.governorate} - {leave.state} - {leave.street}</th>
                                {leave.certified === true && leave.responseDoneFinal === true ? <th>محتسبة</th>
                                : leave.certified === false && leave.responseDoneFinal === true ? <th>غير محتسبة</th>
                                : <th className="text-danger">معلقة</th>
                                }
                                {leave.chronic === true && leave.responseDoneFinal === true ? <th>مزمن</th>
                                : leave.chronic === false && leave.responseDoneFinal === true ? <th>غير مزمن</th>
                                : <th className="text-danger">لم يتم التحديد</th>
                                }
                                <th>
                                    <BtnLink id={leave.id} name='تفاصيل الاخطار' link='/sick-leave-request' class="btn btn-outline-primary" />
                                </th>
                            </tr>
                        )})
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default SickLeavesRecord