import { useState } from "react";
import ChatBot from "./ChatBot";

function Inquiries(){

    const [desc, setDesc] = useState('');

    const handleClick = (message) => {
        setDesc(message);
    };

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block p-3 ps-5">
                    <h2 className="m-0">الاستفسارات</h2>
                </div>
                <div className="d-flex">
                    <div className="p-3 ps-5 ms-2">
                        <button className="btn btn-primary m-1" onClick={() => handleClick("اعتيادية")}>اعتيادية</button>
                        <button className="btn btn-primary m-1" onClick={() => handleClick("عارضة")}>عارضة</button>
                        <button className="btn btn-primary m-1" onClick={() => handleClick("مرضية")}>مرضية</button>
                        <button className="btn btn-primary m-1" onClick={() => handleClick("تصريح")}>تصريح</button>
                    </div>
                    
                </div>
            </div>

            {/* <div className="p-3">
                <h4>الاجازة اعتيادية</h4>
                <p>يتم تقديم طلب الاجازة اعتيادية قبلها بيوم واحد عمل على الأقل</p>
            </div> */}

            <ChatBot messageText={desc}/>
        </div>
    )
}

export default Inquiries;