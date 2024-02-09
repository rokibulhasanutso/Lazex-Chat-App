import { createSlice } from "@reduxjs/toolkit";
import { uid } from '../../firebase/realtimeDatabaseFunctions'


export const userCategorySlice = createSlice({
    name: 'userCategoryList',
    
    initialState: {
        userList: [],
        userListObj: {},
        userInfo: {},
        userProfilePicture: {},
        friendList: [],
        friendRequestList: [],
        blockList: [],
        notificationList: []
    },

    reducers: {
        setUserList: (state, action) => {
            
            // user data category ways binding
            const dataBinding = (users, dataType, defaultValue) => {

                const getData = (userObj, user) => {
                    return {
                        ...userObj,
                        [user.id] : dataType === 'all' ? user : user[dataType]  || defaultValue
                    }
                }

                // reduce make new new object
                return users.reduce(getData, {})
            }

            // all user data 
            state.userList = action.payload
            // all user data 
            state.userListObj = dataBinding(action.payload, 'all', {})

            // all userInfo data binding to users
            const userInfoDefaultDataObject = {name: '', email: '', gender: '', phoneNumber : '', userBio: '', birthdate: ''}
            state.userInfo = dataBinding(action.payload, 'userInfo', userInfoDefaultDataObject)
            
            // all profilePictures data binding to users
            const userProfilePictureDefaultDataObject = {sm : '', md: '', lg: ''}
            state.userProfilePicture = dataBinding(action.payload, 'profilePicture', userProfilePictureDefaultDataObject)

            // all notification data binding to users
            state.notificationList = Object.values(action.payload?.find(user => user.id ===  uid()).notification || {})
        },

        setFriendList: (state, action) => {
            state.friendList = action.payload
        },

        setFriendRequestList: (state, action) => {
            state.friendRequestList = action.payload
        },

        setBlockList: (state, action) => {
            state.blockList = action.payload
        },

        setNotificationList: (state, action) => {
            state.notificationList = action.payload
        }
    }
})

export const { 
    setUserList, 
    setFriendList, 
    setFriendRequestList, 
    setBlockList

} = userCategorySlice.actions

export default userCategorySlice.reducer