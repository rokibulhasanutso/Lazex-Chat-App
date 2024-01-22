import { Outlet } from 'react-router-dom';
import SideNav from '../pages/dashboard/SideNav';
import SortInfoNav from '../pages/dashboard/SortInfoNav';
import { useEffect, useState } from 'react';
import {onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUserInfo, setUserProfilePicture } from '../redux/slice/profileSlice';
import { dbImageRef, dbUserRef } from '../firebase/realtimeDatabaseFunctions';
import SplashScreen from '../components/splashLoadingScreen/SplashScreen';

const DashboardLayout = () => {
    const dispatch =  useDispatch()
    const [dataFetchComplete, setDataFetchComplete] = useState(false)

    useEffect(() => {
        // real time update profile picture 
        // and update redux profile slice state 
        onValue(dbImageRef(), (snapshot) => {
            dispatch(setUserProfilePicture(snapshot.val()))
        })

        // real time update uesr info 
        // and update redux profile slice state 
        onValue(dbUserRef(), (snapshot) => {
            dispatch(setUserInfo(snapshot.val()))

            // this state use for show dashboard after get all data and update redux state
            setDataFetchComplete(true)
        })
    }, [dispatch])

    return (
        <>{
            dataFetchComplete 
            ? <div className='bg-gray-100'>
                <div className='flex px-8 justify-between'>
                    <SideNav/>
                    <div className='m-9 flex-grow'>
                        <Outlet/>
                    </div>
                    <SortInfoNav/>
                </div>
              </div>

            : <SplashScreen/>
        }</>
    );
};

export default DashboardLayout;