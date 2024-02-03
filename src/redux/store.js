import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import modalSlice from './slice/modalSlice'
import profileSlice from './slice/profileSlice'
import chatSlice from './slice/chatSlice'

export default configureStore({
    reducer: {
        authtication: authSlice,
        allModal: modalSlice,
        profileSet: profileSlice,
        chatInfo: chatSlice,
    },
})