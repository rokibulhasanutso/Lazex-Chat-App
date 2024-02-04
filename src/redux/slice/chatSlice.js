import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chatInfo',
    
    initialState: {
        friendLastchatList: []
    },

    reducers: {
        setFriendLastchatList: (state, action) => {
            state.friendLastchatList = action.payload
        },
    }
})

export const { setFriendLastchatList } = chatSlice.actions

export default chatSlice.reducer