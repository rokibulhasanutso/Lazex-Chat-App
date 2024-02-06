import { Outlet } from 'react-router-dom';
import SideNav from '../pages/dashboard/SideNav';
import SortInfoNav from '../pages/dashboard/SortInfoNav';
import { useEffect, useState } from 'react';
import { onValue, update } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUserInfo, setUserProfilePicture } from '../redux/slice/profileSlice';
import { dbActiveRef, dbImageRef, dbUserRef } from '../firebase/realtimeDatabaseFunctions';
import SplashScreen from '../components/splashLoadingScreen/SplashScreen';
import AppModal from '../components/modal/AppModal';
import useSetFriendList from '../hooks/useSetFriendList';
import useFriendsLastChatList from '../hooks/useFriendsLastChatList';
import useGetUserList from '../hooks/useGetUserList';

const DashboardLayout = () => {
    const dispatch =  useDispatch()
    const [dataFetchComplete, setDataFetchComplete] = useState()

    // all data fetch from here
    useGetUserList()
    useSetFriendList()
    useFriendsLastChatList()

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

    // user active status activity
    useEffect(() => {
        // dashboard component when mount sand database sataus active
        update(dbActiveRef(), {active: true})

        const activeStatusFalse = () => {
            update(dbActiveRef(), {active: false})
        }
        // when window close then active status false
        window.addEventListener('beforeunload', activeStatusFalse)

        return () => {
            // when unmount then active status false
            activeStatusFalse()
            window.removeEventListener('beforeunload', activeStatusFalse)
        }
    }, [])

    return (
        <>{
            dataFetchComplete 
            ? 
            <><div className='bg-gray-100'>
                <div className='flex px-8 justify-between'>
                    <SideNav/>
                    <div className='mx-9 flex-grow'>
                        <Outlet/>
                    </div>
                    <SortInfoNav/>
                </div>
              </div>
              
              {/* all modal open in AppModal component */}
              <AppModal/></>

            : <SplashScreen/>
        }</>
    );
};

export default DashboardLayout;