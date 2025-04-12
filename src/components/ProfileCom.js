import Image from '../Images/download.jpeg';
import '../CSS/ProfileCom.css';

function ProfileCom({user}){
    return(
        <div className="rounded profileCom">
            <div className='profileComTop p-3 justify-content-center text-center'>
                    <img src={Image} className="rounded-circle4" alt="profilePicture" />
                    <h5 className='mt-2'>{user.firstName} {user.secondName}</h5>
                    <p className='m-0'>{user.jobTitle}</p>
            </div>
            <div className='p-3'>
                <div>
                    <p className='m-0 text-title'>الرقم القومي</p>
                    <p className='mt-1'>{user.nationalID}</p>
                </div>
                <div>
                    <p className='m-0 text-title'>رقم الهاتف</p>
                    <p className='mt-1'>{user.phoneNumber}</p>
                </div>
                <div>
                    <p className='m-0 text-title'>العنوان</p>
                    <p className='mt-1 mb-0'>{user.governorate} - {user.state} - {user.street}</p>
                </div>
            </div>
            
        </div>
    )
}

export default ProfileCom;
