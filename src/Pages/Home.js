import Hint from "../components/Hint";
import LeaveBalance from "../components/LeaveBalance";
import '../CSS/Home.css';
import PreviousRequests from "../components/UserNormalLeaveRequest";
import Calendar from "../components/Calendar";
import BtnLink from "../components/BtnLink";
import ShortData from "../components/ShortData";
import { useEffect, useState } from "react";
import { BASE_API_URL, roleName, token, userID } from "../server/serves";
import Swal from "sweetalert2";
import LoadingOrError from "../components/LoadingOrError";

function Home(){
    const [leavesWating, setLeavesWating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abort = new AbortController();

        fetch(`${BASE_API_URL}/api/NormalLeave/WaitingByUserID/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        signal: abort.signal,
        })
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => setLeavesWating(data))
        .catch(() => setLeavesWating([]))
        .finally(() => setIsLoading(false));

        return () => abort.abort();
    }, [userID]);


    const showErrorAlert = () => {
        Swal.fire({
            title: "التواصل مع مدير الموارد البشرية؟",
            text: "( هاتف: 01015652527 )",
            icon: "warning",
            iconHtml: "؟",  
            confirmButtonText: "حسنًا",
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button',
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');

                const textElement = popup.querySelector('.swal2-html-container');
                if (textElement) textElement.classList.add('abdo');
            }
            });
        };

    if (isLoading) {
        return <LoadingOrError data={null} />;
    }
    if (!leavesWating) {
        return <LoadingOrError data={[]} />;
    }

    return(
        <div>
            <div className="d-flex">
                <div className="col-xxl-9 col-xl-8 col-sm-12 p-3 custom-scroll">
                    {leavesWating.length > 0 && <Hint leavesWating={leavesWating}/> }
                    <div className="gap-3">
                        <div className="mt-4">
                            { roleName === 'عميد الكلية' || roleName === 'مدير الموارد البشرية' ? <ShortData />
                            : null
                            }
                            <LeaveBalance />
                        </div>
                        {roleName !== 'عميد الكلية' &&
                        <div className="mt-4">
                            {<PreviousRequests />}
                        </div> }
                    </div>
                </div>
                <div className="col-xxl-3 col-xl-4 p-3 d-none d-xl-block custom-scroll">
                    <div className="box">
                        <Calendar />
                    </div>
                    <div className="box mt-2">
                        <h5 className="text-bold">التواصل مع الدعم الفني</h5>
                        <p>يمكنك مراسلتنا لأي استفسارات أو مشكلات تواجهها أثناء استخدام النظام</p>
                        <BtnLink onClick={() => showErrorAlert()} name="تواصل معنًا" link="/" className='btn-primary' />
                    </div>
                    <div className="box mt-2">
                        <h5 className="text-bold">سياسات الإجازات</h5>
                        <p>تعرف على قوانين وإجراءات طلب الإجازات لضمان تجربة سلسة ومريحة</p>
                        <BtnLink name="الإطلاع الآن" link="/inquiries" className='btn-primary' />
                    </div>
                </div>
            </div>
        </div>            
    )
}

export default Home;