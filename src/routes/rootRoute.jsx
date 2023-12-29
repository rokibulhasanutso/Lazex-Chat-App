import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUp from './../pages/auth/SignUp';
import SignIn from './../pages/auth/SignIn';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from "../pages/dashboard/Home";
import Messages from "../pages/dashboard/Messages";
import Notification from './../pages/dashboard/Notification';
import Setting from "../pages/dashboard/Setting";
import ResetPassword from "../pages/auth/ResetPassword";
import WithoutAuthenticationRoute from "./WithoutAuthenticationRoute";

const rootRoute = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/">

            {/* Public route */}
            <Route path="signup" element={<SignUp/>}/>
            
            {/* without authentication route */}
            {/*** when user authenticated this time can't access this route */}
            <Route path="/" element={<WithoutAuthenticationRoute/>}>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="resetpassword" element={<ResetPassword/>}/>
            </Route>

            {/* Private route */}
            <Route path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardLayout/>}>
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