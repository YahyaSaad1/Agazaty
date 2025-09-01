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
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-10 col-lg-4">
                    <div className='p-2 pb-0'>
                        <div className="d-flex headForm text-primary">
                            <Link className='text-decoration-none' to={"/agazaty"}><h4 className='text-bold'>اجازاتي</h4></Link>
                            <p></p>
                            <h6 className='text-bold'>جامعة قنا</h6>
                            <img src={LogoUniversity} alt="LogoUniversity" />
                        </div>
                        <Outlet />
                    </div>
                </div>
                <div className="col d-none d-lg-block cvbb">
                    <img className="rounded img-fluid w-100" src={Door} alt="Door" />
                </div>

                <button
                className="btn btn-primary"
                style={{
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    zIndex: 9999,
                    width: "auto",
                    padding: "5px 10px" 
                }}
                onClick={() => {
                    const link = document.createElement("a");
                    link.href = "photos.pdf";
                    link.download = "website-images.pdf";
                    link.click();
                }}
                >صور للموقع</button>

            </div>
        </div>
    );
}

export default Login;
