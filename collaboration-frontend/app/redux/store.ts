
'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import documentReducer from "./slice/dcuments.slice";
import errorReducer from "./slice/error.slice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        document: documentReducer,
        error: errorReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;