import YahyaSaad from '../Images/YahyaSaad.jpg';
import '../CSS/User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Search({userRole}){
    const userID = localStorage.getItem("userID");
    const [user, setUser] = useState([]);
    const [UserRole, setUserRole] = useState("");

    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
    }, [])


    useEffect(()=>{
        fetch(`http://agazatyapi.runasp.net/api/Account/GetRoleOfUser/${userID}`)
        .then((res)=> res.json())
        .then((data)=> setUserRole(data.role))
    }, [userID])


    return(
        <div className='d-flex gap-2 justify-content-center'>
            <Link to={'/messages'} className='d-flex rounded-circle11'>
                <FontAwesomeIcon icon={faBell} />
            </Link>

            <div>
                <h6 className='m-0'>{user.firstName} {user.secondName}</h6>
                <p className='m-0'>{UserRole}</p>
            </div>
            <Link to={`/profile`}>
                <img src={YahyaSaad} className="hoverOpacity rounded-circle profilePicture" alt="profilePicture" />
            </Link>
        </div>
    )
}

export default Search;