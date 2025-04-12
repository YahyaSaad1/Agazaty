import Search from "./Search"
import User from "./User"

function NavBar({userRole}){
    return(
        <div className="d-flex row head align-items-center">
            <div className="col-md-8 col-lg-8 col-xl-9 ps-4 pe-4">
                <Search/>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-3 d-none d-md-block ps-3 pe-3">
                <User userRole={userRole} />
            </div>
        </div>
    )}
export default NavBar






