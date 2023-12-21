import { Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    
    const checkAuth = () => {
        return true
    }

    return (
        
        checkAuth() 
            ? <Outlet/>
            : <Navigate to="/signin" replace/>
    );
};

export default PrivateRoute