import { Outlet } from 'react-router-dom';
import SideNav from '../pages/dashboard/SideNav';
import SortInfoNav from '../pages/dashboard/SortInfoNav';
import { useEffect } from 'react';
import {onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUserInfo, setUserProfilePicture } from '../redux/slice/profileSlice';
import { dbImageRef, dbUserRef } from '../firebase/realtimeDatabaseFunctions';

const DashboardLayout = () => {
    const dispatch =  useDispatch()

    useEffect(() => {
            // real time update uesr info 
            // and update redux profile slice state 
            onValue(dbUserRef(), (snapshot) => {
                dispatch(setUserInfo(snapshot.val()))
            })

            // real time update profile picture 
            // and update redux profile slice state 
            onValue(dbImageRef(), (snapshot) => {
                dispatch(setUserProfilePicture(snapshot.val()))
            })
    }, [dispatch])

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