import { createSlice } from "@reduxjs/toolkit";
import { localStorageAuthData } from "../../utils/getLocalStorage";

export const authSlice = createSlice({
  name: "authentication",

  initialState: {
    userData: localStorageAuthData,
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