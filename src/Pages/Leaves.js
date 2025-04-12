import { useParams } from "react-router-dom";
import '../CSS/Leaves.css';

function TrackLeave(){
    const params = useParams();
    const leaveTest = { type: 'اعتيادي', date: '16/9/2024', time: '22:52:12', procedure:{friend: true, manager1: true, manager2: false}, nots: 'هناك لجنة جودة' };

    return(
        <div className="p-3">
            <h1>Leave #{params.id}</h1>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                        
                        { leaveTest.procedure.friend === true ?
                            <div className="space">
                                <div className="d-flex justify-content-center align-items-center rounded-circle xxx" style={{backgroundColor:'#cfcfcf'}}>
                                1
                                </div>
                                
                                <div className="d-flex justify-content-center align-items-center line" style={{backgroundColor:'#cfcfcf'}}>
                                    <span className="bbb"></span>
                                </div>
                            </div>
                            :   <div className="space">
                                    <div className="d-flex justify-content-center align-items-center rounded-circle xxx">
                                    1
                                    </div>
                                    
                                    <div className="d-flex justify-content-center align-items-center line">
                                        <span className="bbb"></span>
                                    </div>
                                </div>
                        }
                    <div>
                        <p className="qqq">ارسال الطلب</p>
                    </div>
                </div>

                <div>
                { leaveTest.procedure.manager1 === true ?
                            <div className="space">
                                <div className="d-flex justify-content-center align-items-center rounded-circle xxx">
                                2
                                </div>
                                
                                <div className="d-flex justify-content-center align-items-center line">
                                    <span className="bbb"></span>
                                </div>
                            </div>
                            :   <div className="space">
                                    <div className="d-flex justify-content-center align-items-center rounded-circle xxx">
                                    1
                                    </div>
                                    
                                    <div className="d-flex justify-content-center align-items-center line">
                                        <span className="bbb"></span>
                                    </div>
                                </div>
                        }
                    <div>
                        <p className="qqq">القائم بالعمل</p>
                    </div>
                </div>

                <div>
                { leaveTest.procedure.manager2 === true ?
                    <div className="space">
                        <div className="d-flex justify-content-center align-items-center rounded-circle xxx" style={{backgroundColor:'#0d6efd'}}>
                        1
                        </div>

                        <div className="d-flex justify-content-center align-items-center line" style={{backgroundColor:'#0d6efd'}}>
                            <span className="bbb"></span>
                        </div>
                    </div> :
                    <div className="space">
                        <div className="d-flex justify-content-center align-items-center rounded-circle xxx">
                            3
                        </div>
                        
                        <div className="d-flex justify-content-center align-items-center line">
                            <span className="bbb"></span>
                        </div>
                    </div>
                }
                    <div>
                        <p className="qqq">المدير المباشر</p>
                    </div>
                </div>

                <div>
                    <div className="space">
                        <div className="d-flex justify-content-center align-items-center rounded-circle xxx">
                            4
                        </div>
                    </div>
                    <div>
                        <p className="qqq">المدير المختص</p>
                    </div>
                </div>
            </div>
            <h4>تتبع مسار الاجازة</h4>
            <table className="m-0 table table-striped">
                <thead>
                    <tr>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>التاريخ</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الوقت</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>مرسل من</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الإجراء</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>التأشيرة</th>
                        <th scope="col" style={{backgroundColor:'#F5F9FF'}}>الملحوظات</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <th>{leaveTest.date}</th>
                            <th>{leaveTest.time}</th>
                            <th>الزميل</th>
                            { leaveTest.procedure.friend === true ? <th className="text-success">قبول</th> : <th className="text-danger">رفض</th> }
                            <th>المدير المباشر</th>
                            <th>{leaveTest.nots}</th>
                        </tr>  
                </tbody>
            </table>
        </div>
    )
}

export default TrackLeave;