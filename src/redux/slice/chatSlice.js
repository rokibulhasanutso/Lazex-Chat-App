import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chatInfo',
    
    initialState: {
        friendList: [],
    },

    reducers: {
        setFriendlist: (state, action) => {
            state.friendList = action.payload
        },
    }
})

export const { setFriendlist } = chatSlice.actions

export default chatSlice.reducer