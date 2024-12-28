/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/app/axiosInstance";
import { AppDispatch } from "../store";
import { manageLoading, setError } from "../slice/auth.slice";
import { deleteDocument, fetchAllDocuments, getDocumentById, upsertDocument } from "../slice/dcuments.slice";

export const fetchAllDocumentsAction = ():any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axiosInstance.get(`/doc/list`);
      if (response.status === 200) {        
        dispatch(fetchAllDocuments(response?.data?.document));
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      dispatch(
        setError(
          err?.response?.data?.msg || err?.message || "Something went wrong"
        )
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const getDocumentByIdAction = (id: string):any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axiosInstance.get(`/doc/${id}`);
      if (response.status === 200) {
        dispatch(getDocumentById(response?.data?.document));
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      dispatch(
        setError(
          err?.response?.data?.msg || err?.message || "Something went wrong"
        )
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const upsertDocumentAction = (body: any): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axiosInstance.post(`/doc/upsert`, {
        ...body,
      });
      if (response.status === 200) {
        // dispatch(upsertDocument(response?.data?.document));
        return response?.data?.document?._id;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      dispatch(
        setError(
          err?.response?.data.msg || err?.message || "Something went wrong"
        )
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const deleteDocumentAction = (id: string): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      const response = await axiosInstance.delete(`/doc/${id}`);
      if (response.status === 200) {
        dispatch(deleteDocument(id));
        return 200;
      }
      dispatch(setError("Something went wrong while login"));
      return 401;
    } catch (err: any) {
      dispatch(
        setError(
          err?.response.data.msg || err?.message || "Something went wrong"
        )
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};