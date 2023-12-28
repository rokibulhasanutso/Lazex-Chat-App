import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authentication",

  initialState: {
    userData: null,
    isAuthenticated: false,
  },

  reducers: {
    setUserData: (state, actions) => {
        state.userData = actions.payload
        state.isAuthenticated = actions.payload ? true : false
    },
  },
});

// reducer actions
export const { setUserData } = authSlice.actions;

export default authSlice.reducer;