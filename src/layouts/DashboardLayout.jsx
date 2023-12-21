
import { Outlet } from 'react-router-dom';
import SideNav from '../components/dashboard/SideNav';
const DashboardLayout = () => {
    return (
        <div className='bg-gray-100'>
            <div className='flex px-8'>
                <SideNav/>
                <Outlet/>
            </div>
        </div>
    );
};

export default DashboardLayout;