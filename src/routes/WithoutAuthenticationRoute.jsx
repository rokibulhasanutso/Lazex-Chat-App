import { Navigate, Outlet} from "react-router-dom";
import getlocalStorage from './../utils/getLocalStorage';

const WithoutAuthenticationRoute = () => {
    const currentUser = getlocalStorage()
    
    let isAuthenticated;
    
    if (currentUser) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }

    return (
        
        isAuthenticated
            ? <Navigate to="/" replace/>
            : <Outlet/>
    );
};

export default WithoutAuthenticationRoute