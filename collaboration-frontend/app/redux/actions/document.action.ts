/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/app/axiosInstance";
import { AppDispatch } from "../store";
import { manageLoading, setError } from "../slice/auth.slice";
import { deleteDocument, fetchAllDocuments, getDocumentById, upsertDocument } from "../slice/dcuments.slice";
import { showMessageAction } from "./message.action";

export const fetchAllDocumentsAction = ():any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axiosInstance.get(`/doc/list`);
      if (response.status === 200) {        
        dispatch(fetchAllDocuments(response?.data?.document));
        dispatch(manageLoading(false));
        return 200;
      }
      dispatch(manageLoading(false));

      dispatch(
        showMessageAction({
          message: "Something went wrong while fetching documents",
          variant: "error",
        })
      );
      // dispatch(setError("Something went wrong while fetching documents"));
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message:
            err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const getDocumentByIdAction = (id: string):any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axiosInstance.get(`/doc/${id}`);
      if (response.status === 200) {
        dispatch(getDocumentById(response?.data?.document));
        dispatch(manageLoading(false));
        return 200;
      }
      dispatch(manageLoading(false));
      // dispatch(setError("Something went wrong while fetch doument"));
      dispatch(
        showMessageAction({
          message: "Something went wrong while fetch doument",
          variant: "error",
        })
      );
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message:
            err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const upsertDocumentAction = (body: any): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axiosInstance.post(`/doc/upsert`, {
        ...body,
      });
      if (response.status === 200) {
        // dispatch(upsertDocument(response?.data?.document));
        dispatch(
          showMessageAction({
            message: "Changes saved successfully",
            variant: "success",
          })
        );
        dispatch(manageLoading(false));
        return response?.data?.document?._id;
      }
      dispatch(manageLoading(false));
      // dispatch(setError("Something went wrong while saving the changes."));
      dispatch(
        showMessageAction({
          message: "Something went wrong while saving the changes.",
          variant: "error",
        })
      );
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message:
            err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};

export const deleteDocumentAction = (id: string): any => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(manageLoading(true));
      const response = await axiosInstance.delete(`/doc/${id}`);
      if (response.status === 200) {
        dispatch(deleteDocument(id));
        dispatch(
          showMessageAction({
            message: "Document deleted successfully",
            variant: "success",
          })
        );
        dispatch(manageLoading(false));
        return 200;
      }
      dispatch(manageLoading(false));
      // dispatch(setError("Something went wrong while delete document"));
      dispatch(
        showMessageAction({
          message: "Something went wrong while delete document",
          variant: "error",
        })
      );
      return 401;
    } catch (err: any) {
      dispatch(
        showMessageAction({
          message:
            err?.response.data.msg || err?.message || "Something went wrong",
          variant: "error",
        })
      );
      dispatch(manageLoading(false));
      return;
    }
  };
};