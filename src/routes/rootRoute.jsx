import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUp from './../pages/auth/SignUp';
import SignIn from './../pages/auth/SignIn';
// import DashboardLayout from '../layouts/DashboardLayout';
import Home from "../pages/home/Home";
import Messages from "../pages/message/Messages";
import Notification from '../pages/notification/Notification';
import Setting from "../pages/setting/Setting";
import ResetPassword from "../pages/auth/ResetPassword";
import WithoutAuthenticationRoute from "./WithoutAuthenticationRoute";
import { Suspense, lazy } from "react";
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
import SplashScreen from './../components/splashLoadingScreen/SplashScreen';

const rootRoute = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/">
            
            {/* without authentication route */}
            {/*** when user authenticated this time can't access this route */}
            <Route path="/" element={<WithoutAuthenticationRoute/>}>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="resetpassword" element={<ResetPassword/>}/>
            </Route>

            {/* Private route */}
            <Route path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<Suspense fallback={<SplashScreen/>}><DashboardLayout/></Suspense>}>
                    <Route index element={<Home/>}/>
                    <Route path="messages" element={<Messages/>}/>
                    <Route path="notification" element={<Notification/>}/>
                    <Route path="setting" element={<Setting/>}/>
                </Route>
            </Route>

        </Route>
    )
)



export default rootRoute