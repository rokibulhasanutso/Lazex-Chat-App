import { createSlice } from "@reduxjs/toolkit";

export const userCategorySlice = createSlice({
    name: 'userCategoryList',
    
    initialState: {
        userList: [],
        friendList: [],
        friendRequestList: [],
        blockList: [],
        notificationList: []
    },

    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload
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