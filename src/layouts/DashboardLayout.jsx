import { Outlet } from 'react-router-dom';
import SideNav from '../pages/dashboard/SideNav';
import SortInfoNav from '../pages/dashboard/SortInfoNav';

const DashboardLayout = () => {
    return (
        <div className='bg-gray-100'>
            <div className='flex px-8 justify-between'>
                <SideNav/>
                <div className='m-9 flex-grow'>
                    <Outlet/>
                </div>
                <SortInfoNav/>
            </div>
        </div>
    );
};

export default DashboardLayout;