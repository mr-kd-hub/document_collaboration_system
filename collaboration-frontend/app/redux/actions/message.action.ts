/* eslint-disable @typescript-eslint/no-explicit-any */
import { hideMessage, showMessage } from "../slice/error.slice";
import { AppDispatch } from "../store";

export function hideMessageAction():any {
	return async (dispatch: AppDispatch) => {
        dispatch(hideMessage());
    }
}

interface ShowMessageOptions {
	message: string;
	variant: 'success' | 'error' | 'info' | 'warning';
	autoHideDuration?: number;
	anchorOrigin?: {
		vertical: string;
		horizontal: string
	}
}

export function showMessageAction(options: ShowMessageOptions):any {
    return async (dispatch: AppDispatch) => {
        dispatch(showMessage({ ...options }));
    }
}