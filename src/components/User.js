import Image from '../Images/download.jpeg';
import '../CSS/User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useUserData } from '../server/serves';

function Search(){
    const userData = useUserData();

    return(
        <div className='d-flex gap-2 justify-content-center'>
            <Link to={'/messages'} className='d-flex rounded-circle11'>
                <FontAwesomeIcon icon={faBell} />
            </Link>

            <div>
                <b className='m-0'>{userData.firstName} {userData.secondName}</b>
                <p className='m-0'>{userData.roleName}</p>
            </div>
            <Link to={`/profile`} className='rounded-circle4'>
                <img src={Image} className="hoverOpacity rounded-circle profilePicture" alt="profilePicture" />
            </Link>
        </div>
    )
}

export default Search;