import { useEffect, useState } from 'react';
import Door from '../Images/Door.jpg';
import '../CSS/login.css';
import { Link, Outlet } from 'react-router-dom';
import LogoUniversity from '../Images/LogoUniversity.jpg';
import LoadingOrError from '../components/LoadingOrError';

function Login() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = Door;
        img.onload = () => {
            setLoading(false);
        };
    }, []);

    if (loading) {
        return <LoadingOrError data={null} />;
    }

    return (
        <div className="container login">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className='container-1'>
                        <div className="d-flex headForm text-primary">
                            <Link className='text-decoration-none' to={"/agazaty"}><h4 className='text-bold'>اجازاتي</h4></Link>
                            <p></p>
                            <h6 className='text-bold'>جامعة قنا</h6>
                            <img src={LogoUniversity} alt="LogoUniversity" />
                        </div>
                        <Outlet />
                        <div className="wordBottom">
                            <span id="emailHelp" className="form-text">تم بواسطة. </span>
                            <Link to={'/agazaty'} id="emailHelp" className="form-text text-color text-primary">طلاب من الدفعة الثانية حاسبات قنا</Link>
                        </div>
                    </div>
                </div>
                <div className="col d-none d-md-block">
                    <img className="rounded img-fluid" src={Door} alt="Door" />
                </div>
            </div>
        </div>
    );
}

export default Login;
