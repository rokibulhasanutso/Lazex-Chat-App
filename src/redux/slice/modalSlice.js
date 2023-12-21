import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'allModal',

    initialState: {
        imageProfileModal: false,
    },

    reducers: {
        showImageProfileModal: (state, actions) => {
            state.imageProfileModal = actions.payload
        },

        closeModal: (state) => {
            Object.entries(state).forEach(([key, value]) => {
                if (value) {
                    state[key] = false;
                }
            })
        }
    },
})

// reducer actions
export const { showImageProfileModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer