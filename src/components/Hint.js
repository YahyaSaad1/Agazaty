import time from '../Images/time.png';
import '../CSS/Hint.css';
import BtnLink from './BtnLink';

function Hint({leavesWating}) {

    return (
        <div>
            {leavesWating.map((leaveWaiting, index)=>{
                return(
                    <div key={index} to={'/agazaty'} className='box mb-4 text-decoration-none'>
                        <div className="d-flex row rounded-2 align-items-center justify-content-center">
                            <div className='col-sm-12 col-md-3 hintImage rounded-3 d-flex justify-content-center align-items-center'>
                                <img src={time} className='rounded-2' alt="hintImage" />
                            </div>

                            <div className='col-sm-12 col-md-7'>
                                <p className='mt-2 mb-2 text-bold'>طلب الإجازة قيد الانتظار</p>
                                <p>
                                    <span>تم إرسال طلب الإجازة بنجاح. حاليا في انتظار موافقة </span>
                                    {leaveWaiting.holder === 0 ? <span className='cursor-pointer text-primary text-bold' title={leaveWaiting.coworkerName}>القائم بالعمل</span>
                                    : leaveWaiting.holder === 1 ? <span className='cursor-pointer text-primary text-bold' title={leaveWaiting.directManagerName}>المدير المباشر</span>
                                    : leaveWaiting.holder === 2 ? <span className='cursor-pointer text-primary text-bold' title={leaveWaiting.generalManagerName}>المدير المختص</span>
                                    : null}
                                </p>

                                <BtnLink id={leaveWaiting.id} name={`#المرجع`} link='/agazaty/normal-leave-request' className='btn-warning rounded-2 p-1 d-inline-block m-0'/>
                                <div className="d-inline-block d-lg-none me-3">
                                    <BtnLink id={leaveWaiting.id} name='تفاصيل الإجازة' link={`/agazaty/normal-leave-request`} className="btn-primary rounded-2 p-1 d-inline-block m-0"/>
                                </div>
                            </div>

                            <div className='col-2 d-none d-lg-flex justify-content-center'>
                                <BtnLink id={leaveWaiting.id} name='تفاصيل الإجازة' link={`/agazaty/normal-leave-request`} className="btn-primary align-self-center"/>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Hint;
