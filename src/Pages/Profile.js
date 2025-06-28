import ProfileCom from "../components/ProfileCom";
import ProfileDescription from "../components/ProfileDescription";
import { useUserData } from "../server/serves";
import LoadingOrError from "../components/LoadingOrError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Profile(){
    const userData = useUserData();
    if (!userData || Object.keys(userData).length === 0) {
        return <LoadingOrError data={null} />;
    }

    return(
        <div>
            <div className="d-flex mb-4 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0 text-nowrap">الملف الشخصي</h2>
                </div>
                <div className="d-flex">
                    <div className="d-flex">
                        <Link to="/edit-password" role="button" className="btn btn-primary my-3 d-flex align-items-center ms-3" >
                            <FontAwesomeIcon icon={faUnlockKeyhole} style={{ fontSize: "1.2em" }} />
                            <span className="d-none d-sm-inline">&nbsp;تعديل كلمة المرور</span>
                        </Link>
                    </div>

                    <div className="d-flex">
                        <Link to="/editprofile" role="button" className="btn btn-primary my-3 d-flex align-items-center ms-3" >
                            <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "1.2em" }} />
                            <span className="d-none d-sm-inline">&nbsp;تعديل المعلومات الشخصية</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mt-4 border-dashed">
                    <ProfileCom userData={userData} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-7 col-xl-8 col-xxl-9 mt-4">
                    <ProfileDescription userData={userData} />
                </div>
            </div>
        </div>
    )
}

export default Profile;