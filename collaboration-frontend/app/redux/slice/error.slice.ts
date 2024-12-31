/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    state: boolean;
    options: any;

} = {
    state: false,
	options: {
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'right'
		},
		autoHideDuration: 4000,
		message: 'Hi',
		variant: null
	}

};
export const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = { ...state.options, ...action.payload };
    },
    hideMessage: (state) => {
        state.state = false;
        state.options = {...initialState.options };
    }
  },
});

export const { showMessage, hideMessage } = messageSlice.actions
export default messageSlice.reducer;
