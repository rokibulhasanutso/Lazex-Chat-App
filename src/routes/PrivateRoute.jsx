import { Navigate, Outlet} from "react-router-dom";
// import { useSelector } from "react-redux";
import getlocalStorage from "../utility/getLocalStorage";

const PrivateRoute = () => {
    // const { isAuthenticated } = useSelector((state) => state.authtication)

    // console.log(isAuthenticated)
    let isAuthenticated = false;
    const currentUser = getlocalStorage()
    if (currentUser) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }

    console.log(isAuthenticated, currentUser);

    return (
        
        isAuthenticated
            ? <Outlet/>
            : <Navigate to="/signin" replace/>
    );
};

export default PrivateRoute