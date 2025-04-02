import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const location = useLocation();
    const { authUser } = useContext(UserContext);

    //If logged in, go to original route, otherwise redirect to signin
    if (authUser) {
        return <Outlet />;
    } else {
        return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
    }
}

export default PrivateRoute;