import Hint from "../components/Hint";
import LeaveBalance from "../components/LeaveBalance";
import '../CSS/Home.css';
import PreviousRequests from "../components/PreviousRequests";
import Calendar from "../components/Calendar";
import BtnLink from "../components/BtnLink";
import ShortData from "../components/ShortData";
import { useEffect, useState } from "react";
import API from "../Data" ;

function Home({userRole}){
    const userID = localStorage.getItem("userID");
    const [NormalLeaves, setNormalLeaves] = useState([]);
    const [leavesWating, setLeavesWating] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/AllNormalLeavesByUserId/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setNormalLeaves(data))
    }, [userID])

    useEffect(() => {
        fetch(`http://agazatyapi.runasp.net/api/NormalLeave/WaitingByUserID/${userID}`)
            .then((res) => res.json())
            .then((data) => setLeavesWating(data))
    }, [userID]);

    console.log(userRole)

    return(
        <div>
            <div className="d-flex">
                <div className="col-xxl-9 col-xl-8 col-sm-12 p-3 custom-scroll">
                    {leavesWating.length > 0 && <Hint leavesWating={leavesWating}/> }
                    <div className="gap-3">
                        <div className="mt-4">
                            { userRole === 'عميد الكلية' ? <ShortData />
                            : userRole === 'مدير الموارد البشرية' ? <ShortData />
                            : null
                            }
                            <LeaveBalance />
                        </div>
                        <div className="mt-4">
                            {NormalLeaves.length > 0 && <PreviousRequests leaves={NormalLeaves} />}
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-xl-4 p-3 d-none d-xl-block custom-scroll">
                    <div className="box">
                        <Calendar />
                    </div>
                    <div className="box mt-2">
                        <h5>التواصل مع الدعم الفني</h5>
                        <p>يمكنك مراسلتنا لأي استفسارات أو مشكلات تواجهها أثناء استخدام النظام</p>
                        <BtnLink name="اتصل بنا" link="/" class='btn-primary' />
                    </div>
                    <div className="box mt-2">
                        <h5>سياسات الاجازات</h5>
                        <p>تعرف على قوانين وإجراءات طلب الإجازات لضمان تجربة سلسة ومريحة</p>
                        <BtnLink name="الأطلاع الآن" link="/inquiries" class='btn-primary' />
                    </div>
                </div>
            </div>
        </div>            
    )
}

export default Home;