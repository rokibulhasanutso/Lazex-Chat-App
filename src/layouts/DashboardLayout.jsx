import { Outlet } from 'react-router-dom';
import SideNav from '../pages/dashboard/SideNav';
import SortInfoNav from '../pages/dashboard/SortInfoNav';
import { useEffect } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from './../firebase/firebaseConfig';
import getlocalStorage from './../utils/getLocalStorage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slice/profileSlice';

const DashboardLayout = () => {
    const db = getDatabase(app)
    const dispatch =  useDispatch()

    useEffect(() => {
        onValue(ref(db, `users/${getlocalStorage().uid}`), (snapshot) => {
            dispatch(setUserInfo(snapshot.val()))
        })
    }, [dispatch, db])

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