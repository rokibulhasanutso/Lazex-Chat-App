import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profileSet',

    initialState: {
        defaultAvater: {
            male: ['/avater/avater_m_1.jpg', '/avater/avater_m_2.jpg', '/avater/avater_m_3.jpg', '/avater/avater_m_4.jpg'],
            female: ['/avater/avater_f_1.jpg', '/avater/avater_f_2.jpg', '/avater/avater_f_3.jpg', '/avater/avater_f_4.jpg'],
        },
        profilePicture: [],
        userPersonalInfo: null,
        userProfilePicture: null,
        currentProfilePicture : '/avater/avater_f_1.jpg'
    },

    reducers: {
        setProfilePicture: (state, actions) => {
            if (!state.profilePicture.includes(actions.payload)) {
                state.profilePicture.push(actions.payload)
                state.currentProfilePicture = actions.payload
            }
        },
        
        changeCurrentProfilePicture: (state, actions) => {
            state.currentProfilePicture = actions.payload
        },

        setUserInfo: (state, actions) => {
            state.userPersonalInfo = actions.payload
        },
        
        setUserProfilePicture: (state, actions) => {
            state.userProfilePicture = actions.payload
            state.currentProfilePicture = actions.payload?.lg
            
            if (!state.profilePicture.includes(actions.payload?.lg)) {
                state.profilePicture.push(actions.payload?.lg)
            }
        }
    },
})

export const { 
    setProfilePicture , 
    changeCurrentProfilePicture, 
    setUserInfo, 
    setUserProfilePicture 

} = profileSlice.actions;

export default profileSlice.reducer;