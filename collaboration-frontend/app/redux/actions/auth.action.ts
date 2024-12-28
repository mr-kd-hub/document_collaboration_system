/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../store";
import axios from "../../axiosInstance";
import Cookies from 'js-cookie';
import {
  login,
  manageLoading,
  resetError,
  setAuthState,
  setError,
} from "../slice/auth.slice";

export const setErrorAction = (err: string): any => {
  return (dispatch: AppDispatch, getState: any) => {
    dispatch(setError(err));
    setTimeout(() => dispatch(resetError()), 1500);
  };
};
export const loginAction = (body: any) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axios.post(`/auth/sign-in`, {
        ...body,
      });
      if (response.status === 200) {
        dispatch(login(response?.data?.token));
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      dispatch(setError(err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const registerAction = (body: any) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axios.post(`/auth/sign-up`, {
        ...body,
      });
      if (response.status === 201) {
        dispatch(login(response?.data?.token));
        return 200;
      }
      // dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      
      dispatch(setError(err?.response.data.msg || err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const setAuthStateAction = (token: any): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    const tk = token || Cookies.get("token") //localStorage.getItem("token");
    dispatch(setAuthState(tk));
    return !!token;
  };
};
