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

const rootRoute = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/">

            {/* // Public route */}
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/>

            {/* Private route */}
            <Route path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="messages" element={<Messages/>}/>
                    <Route path="notification" element={<Notification/>}/>
                </Route>
            </Route>
                    <Route path="setting" element={<Setting/>}/>

        </Route>
    )
)



export default rootRoute