import Image from '../Images/download.jpeg';
import '../CSS/User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Search(){
    const userID = localStorage.getItem("userID");
    const [user, setUser] = useState([]);

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
    }, [])


    return(
        <div className='d-flex gap-2 justify-content-center'>
            <Link to={'/messages'} className='d-flex rounded-circle11'>
                <FontAwesomeIcon icon={faBell} />
            </Link>

            <div>
                <h6 className='m-0'>{user.firstName} {user.secondName}</h6>
                <p className='m-0'>{user.roleName}</p>
            </div>
            <Link to={`/profile`} className='rounded-circle4'>
                <img src={Image} className="hoverOpacity rounded-circle profilePicture" alt="profilePicture" />
            </Link>
        </div>
    )
}

export default Search;