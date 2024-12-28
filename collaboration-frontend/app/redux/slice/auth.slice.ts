import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const initialState: {
  isAuthenticated: boolean;
  token: string | null;
  error: string;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: any;
} = {
  isAuthenticated: true,
  token: null,
  error: "",
  loading: false,
  detail: null
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
      const decoded = jwtDecode(action.payload);
      state.detail = decoded;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      // localStorage.removeItem("token");
      Cookies.remove("token");
      state.detail = undefined
    },
    setAuthState: (state,action) => {
      const token = action.payload
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        const decoded = jwtDecode(token);
        state.detail = decoded;
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.detail = undefined
      }
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Save token
      Cookies.set("token", action.payload, { expires: 7 });
      const decoded = jwtDecode(action.payload);
      state.detail = decoded;
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
