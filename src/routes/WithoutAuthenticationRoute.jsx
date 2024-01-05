import { Navigate, Outlet} from "react-router-dom";
// import { useSelector } from "react-redux";
import getlocalStorage from "../utils/getLocalStorage";

const WithoutAuthenticationRoute = () => {
    
    let isAuthenticated = false;
    const currentUser = getlocalStorage()
    if (currentUser) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }

    // console.log(isAuthenticated, currentUser);

    return (
        
        isAuthenticated
            ? <Navigate to="/" replace/>
            : <Outlet/>
    );
};

export default WithoutAuthenticationRoute