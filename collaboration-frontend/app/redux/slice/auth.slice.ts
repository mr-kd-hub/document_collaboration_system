import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState: {
  isAuthenticated: boolean;
  token: string | null;
  error: string;
  loading: boolean;
} = {
  isAuthenticated: true,
  token: null,
  error: "",
  loading: false
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Save token
      // localStorage.setItem("token", action.payload); // Store token in localStorage
      Cookies.set("token", action.payload, { expires: 7 });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      // localStorage.removeItem("token");
      Cookies.remove("token");
    },
    setAuthState: (state,action) => {
      const token = action.payload
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.token = null;
      }
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Save token
      Cookies.set("token", action.payload, { expires: 7 });
    },
    setError: (state,action) => {
      state.error = action.payload
    },
    manageLoading: (state,action) => {
      state.loading = action.payload
    },
    resetError: (state) => {
      state.error = ""
    },
  },
});

export const { login, logout, setAuthState, setError, manageLoading, resetError } = authSlice.actions
export default authSlice.reducer;
