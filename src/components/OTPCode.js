import '../CSS/login.css';
import BtnLink from './BtnLink';

function OTPCode(){
    return(
        <>
            <div className='wordLogin'>
                <h4 className="text-center text-head">لقد ارسلنا كود التحقق</h4>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputText1" className="form-label"> كود التحقق</label>
                <div className="otp-container">
                    <input type="text" id="exampleInputText1" className="otp-input" placeholder="8" maxLength="1" />
                    <input type="text" id="exampleInputText1" className="otp-input" placeholder="1" maxLength="1" />
                    <input type="text" id="exampleInputText1" className="otp-input" placeholder="5" maxLength="1" />
                    <input type="text" id="exampleInputText2" className="otp-input" placeholder="2" maxLength="1" />
                    <input type="text" id="exampleInputText3" className="otp-input" placeholder="7" maxLength="1" />
                    <input type="text" id="exampleInputText4" className="otp-input" placeholder="9" maxLength="1" />
                </div>
            </div>
            <BtnLink name='استمرار' link='/login/resetpassword' class='btn-primary w-100'/>
        </>
    )
}

export default OTPCode;