/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import TextEditor from "../TextEditor/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentByIdAction,
  upsertDocumentAction,
} from "@/app/redux/actions/document.action";
import { RootState } from "@/app/redux/store";
import { useFormik } from "formik";
import Versions from "../Versions/Versions";
import { resetDocument } from "@/app/redux/slice/dcuments.slice";
import { socket } from "@/app/helper";

function CreateComponent(props: any) {
  const { id } = props;
  const dispatch = useDispatch();
  const currentDocument = useSelector(
    (state: RootState) => state.document.document
  );
  const authDetail = useSelector((state: RootState) => state.auth.detail);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  console.log("activeUsers",activeUsers);
  

  const formik = useFormik({
    initialValues: {
      id: id ? id || "" : "",
      title: id ? (currentDocument?.title || "") : "",
      content: id ? (currentDocument?.content || "") : "",
      versions: id ? (Array.isArray(currentDocument?.versions) ? [...currentDocument?.versions] : []) : [],
    },
    onSubmit: async(values:any,{ resetForm, setValues }:any) => {
      try{
        const id = await dispatch(upsertDocumentAction({ ...values }));
        setValues((prev: any) => ({ ...prev, id }));
        // resetForm()
      }
      catch(err:any){
        console.error(err);
      }
    },
  });
  const { values, handleChange, setValues, handleSubmit, dirty, resetForm  } = formik;
  const { title, content } = values;

  const documentId = values?.id || id
  console.log("documentId",documentId);
  
  // const upsertDocument = async (field: string, value: string) => {
  //   const body: { id?: string, title?: string; content?: string} = {
  //     id: documentId,
  //   };
  //   if(field === "title") body.title = value;
  //   if(field === "content") body.content = value;
  //   const new_id = await dispatch(upsertDocumentAction({ ...body }));
  //   setValues({ ...values, id: new_id });
  // };

  // const saveDocument = useCallback(async () => {
  //   try {
      
  //     // setIsSaving(true);
  //     const new_id = await dispatch(upsertDocumentAction({id: documentId,  title: values?.title, content: values?.content }));
  //     setValues({ ...values, id: new_id });
  //     // setIsSaving(false);
  //   } catch (error) {
  //     console.error('Error saving document:', error);
  //     // setIsSaving(false);
  //   }
  // }, [documentId, values?.content]);

  useEffect(() => {
    async function callApi(){
      if (id) {
       await dispatch(getDocumentByIdAction(id));
      }
    }    
    callApi()
  }, [id, dispatch]);

  useEffect(()=>{
    if(currentDocument || id){
      setValues({
        ...values,
        content: currentDocument?.content || "",
        title: currentDocument?.title || "",
        id: currentDocument?._id || documentId,
        versions: Array.isArray(currentDocument?.versions) ? [...currentDocument?.versions] : [],
      })
    }
    return () => {
      if(!id){       
        dispatch(resetDocument(id))
        resetForm()
      }
    }
  },[currentDocument, dispatch, id])
  
  useEffect(() => {
    if (documentId) {
     
      socket.emit("join-document", documentId);

      // Join the document room and load the document content
      socket.emit("load-document", documentId);

      // Listen for the document's initial content
      socket.on("documentState", (payload) => {
        setValues((prev: any) => ({ ...prev, id: payload?._id, ...payload }));
      });

      // Listen for real-time updates from other users
      socket.on("updateDocument", (payload) => {
        setValues((prev: any) => ({ ...prev, ...payload }));
      });

      
      return () => {
        socket.off("documentState");
        socket.off("user-presence");
      };
    }
  }, [documentId, setValues]);

    //auto save document
  // useEffect(() => {
    // const timer = setTimeout(() => {
    //   saveDocument();
    // }, 2000); // Save after 2 seconds of inactivity

  //   return () => clearTimeout(timer);
  // }, [values?.content, saveDocument]);

  // Save document on page unload
  // useEffect(() => {
  //   const handleBeforeUnload = (event: any) => {
  //     // Call saveDocument to persist the changes
  //     saveDocument();
      
  //     // Prevent default unload behavior
  //     event.preventDefault();
  //     event.returnValue = ''; // For Chrome compatibility
  //   };
  
  //   const handleUnload = () => {
  //     // Save the document during unload
  //     saveDocument();
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('unload', handleUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleUnload);
  //   };
  // }, [saveDocument]);

  const loadversion = (version:any) => {
    socket.emit("updateDocument", {
      content: version?.content,
      title: version?.title || "Untitled document",
    });
    setValues({...values, content: version?.content, title: (version?.title || "Untitled document")})
  }
  const handleTitleChange = (e:any) => {
    handleChange(e)
    const newText = e.target.value
    socket.emit('updateDocument', {title: newText});
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-screen p-10 overflow-hidden">
      <div className="mb-6">
        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          name="title"
          value={title || ""}
          onChange={handleTitleChange}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="flex flex-1 gap-6">
        <div className="w-[75%] flex flex-col gap-6 overflow-hidden">
          <TextEditor
            setValues={setValues}
            content={content}
            handleChange={handleChange}
            documentId={documentId}
          />
          <button
            type="submit"
            disabled={!dirty}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>

        <div className="w-[25%] overflow-y-auto">
          <Versions loadVersion={loadversion} versionList={values?.versions || []} />
        </div>
      </div>
    </form>
  );
}

export default CreateComponent;
