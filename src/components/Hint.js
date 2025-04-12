import time from '../Images/time.png';
import '../CSS/Hint.css';
import BtnLink from './BtnLink';

function Hint({leavesWating}) {

    return (
        <div>
            {leavesWating.map((leaveWaiting, index)=>{
                return(
                    <div key={index} to={'/agazaty'} className='box mt-3 text-decoration-none'>
                        <div className="d-flex row rounded-3">
                            <div className='col-3 hintImage rounded-3 d-flex justify-content-center align-items-center ms-3'>
                                <img src={time} className='rounded-3' alt="hintImage" />
                            </div>
                            <div className='col p-1'>
                                <p>طلب الاجازة قيد الانتظار</p>
                                <p>
                                    <span>تم إرسال طلب الاجازة بنجاح. حاليا في انتظار موافقة </span>
                                    
                                    {leaveWaiting.holder === 0 ? <span className='cursor-pointer text-primary' title={leaveWaiting.coworkerName}>القائم بالعمل</span>
                                    : leaveWaiting.holder === 1 ? <span className='cursor-pointer text-primary' title={leaveWaiting.directManagerName}>المدير المباشر</span>
                                    : leaveWaiting.holder === 2 ? <span className='cursor-pointer text-primary' title={leaveWaiting.generalManagerName}>المدير المختص</span>
                                    : null}
                                </p>
                                <BtnLink id={leaveWaiting.id} name={`#${leaveWaiting.id}`} link='/normal-leave-request' class='btn-warning rounded-3 p-1 d-inline-block m-0' />
                            </div>
                            <div className='col-2 d-flex justify-content-center'>
                                <BtnLink id={leaveWaiting.id} name='تفاصيل الاجازة' link={`/normal-leave-request`} class="btn-primary align-self-center" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Hint;
