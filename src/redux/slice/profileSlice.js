import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profileSet',

    initialState: {
        defaultAvater: {
            male: ['/avater/avater_m_1.jpg', '/avater/avater_m_2.jpg', '/avater/avater_m_3.jpg', '/avater/avater_m_4.jpg'],
            female: ['/avater/avater_f_1.jpg', '/avater/avater_f_2.jpg', '/avater/avater_f_3.jpg', '/avater/avater_f_4.jpg'],
            currentAvatar: '/avater/avater_f_1.jpg',
        },
        profilePicture: [],

    },

    reducers: {
        setProfilePicture: (state, actions) => {
            if (!state.profilePicture.includes(actions.payload)) {
                state.profilePicture.push(actions.payload)
            }
        },
        
        changeCurrentAvatar: (state, actions) => {
            state.defaultAvater.currentAvatar = actions.payload
        }
    },
})

export const { setProfilePicture , changeCurrentAvatar } = profileSlice.actions;

export default profileSlice.reducer;