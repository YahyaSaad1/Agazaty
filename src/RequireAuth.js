import { Navigate, Outlet } from "react-router-dom";
import { token } from "./server/serves";

function RequireAuth() {
    return token? <Outlet/> : <Navigate to="/agazaty" />;
}

export default RequireAuth;
