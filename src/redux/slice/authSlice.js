import { createSlice } from '@reduxjs/toolkit';
import currentUser from '../../firebase/currentUser';

export const authSlice = createSlice({
    name: 'authentication',

    initialState: {
        userData: currentUser((data) => ({
            uid: data.uid, 
            displayName: data.displayName, 
            email: data.email, 
            photoURL: data.photoURL
        }))
    },

    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
})

// reducer actions
export const { increment } = authSlice.actions;

export default authSlice.reducer;