import { Navigate, Outlet} from "react-router-dom";
import getlocalStorage from "../utils/getLocalStorage";

const PrivateRoute = () => {
    const currentUser = getlocalStorage()
    
    let isAuthenticated;

    if (currentUser) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }

    return (
        
        isAuthenticated
            ? <Outlet/>
            : <Navigate to="/signin" replace/>
    );
};

export default PrivateRoute