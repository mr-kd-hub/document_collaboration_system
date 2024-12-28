/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  documents: any[];
  document: any;

} = {
    documents: [],
    document: null,

};
export const documentSlice = createSlice({
  name: "Documents",
  initialState,
  reducers: {
    fetchAllDocuments: (state, action) => {
      state.documents = action.payload;
    },
    getDocumentById: (state, action) => {
        state.document = action.payload;
    },
    upsertDocument: (state, action) => {
        state.document = action.payload 
    },
    deleteDocument:(state, action) => {
      const new_list = state.documents.filter(doc => doc._id !== action.payload) || [];
      state.documents = new_list;
    },
    resetDocument:(state) => {
      state.document = null
    }
  },
});

export const { fetchAllDocuments, getDocumentById, upsertDocument, deleteDocument, resetDocument } = documentSlice.actions
export default documentSlice.reducer;
