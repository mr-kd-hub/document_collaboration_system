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
import { showMessageAction } from "./message.action";

export const setErrorAction = (err: string): any => {
  return (dispatch: AppDispatch, getState: any) => {
    dispatch(setError(err));
    setTimeout(() => dispatch(resetError()), 1500);
  };
};
export const loginAction = (body: any) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axios.post(`/auth/sign-in`, {
        ...body,
      });
      if (response.status === 200) {
        dispatch(login(response?.data?.token));
        dispatch(
          showMessageAction({
            message: "Sign-in success",
            variant: "success",
          })
        );
        dispatch(manageLoading(false));
        return 200;
      }
      // dispatch(setError("Something went wrong while login"));
      dispatch(
        showMessageAction({
          message: "Something went wrong while login",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message: err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const registerAction = (body: any) => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axios.post(`/auth/sign-up`, {
        ...body,
      });
      if (response.status === 201) {
        dispatch(login(response?.data?.token));
        dispatch(
          showMessageAction({
            message: "Sign-up success",
            variant: "success",
          })
        );
        dispatch(manageLoading(false));
        return 200;
      }
      dispatch(manageLoading(false));
      dispatch(
        showMessageAction({
          message: "Not able to sign-up",
          variant: "error",
        })
      );
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message: err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      // dispatch(setError(err?.response.data.msg || err?.message || "Something went wrong"));
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const setAuthStateAction = (token?: any): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    const tk = token || Cookies.get("token") //localStorage.getItem("token");
    dispatch(setAuthState(tk));
    dispatch(
      showMessageAction({
        message: "Session restored",
        variant: "success",
      })
    );
    return !!token;
  };
};
