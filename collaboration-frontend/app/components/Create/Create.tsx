/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
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

function CreateComponent(props: any) {
  const { id } = props;
  const dispatch = useDispatch();
  const currentDocument = useSelector(
    (state: RootState) => state.document.document
  );

  const formik = useFormik({
    initialValues: {
      id: id ? id || "" : "",
      title: id ? (currentDocument?.title || "") : "",
      content: id ? (currentDocument?.content || "") : "",
      versions: id ? (currentDocument?.versions || []) : [],
    },
    onSubmit: async(values:any,{ resetForm }:any) => {
      try{
        await dispatch(upsertDocumentAction({ ...values }));
        resetForm()
      }
      catch(err:any){
        console.error(err);
      }
    },
  });
  const { values, handleChange, setValues, handleSubmit, dirty, resetForm  } = formik;
  const { title, content } = values;

  const upsertDocument = async (field: string, value: string) => {
    const body: { id?: string, title?: string; content?: string} = {
      id: id || values?.id,
    };
    if(field === "title") body.title = value;
    if(field === "content") body.content = value;
    const new_id = await dispatch(upsertDocumentAction({ ...body }));
    setValues({ ...values, id: new_id });
  };

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
        id: currentDocument?._id || id,
        versions: currentDocument?.versions || [],
      })
    }
    return () => {
      if(!id){       
        dispatch(resetDocument(id))
        resetForm()
      }
    }
  },[currentDocument, dispatch, id])
  
  console.log("currentDocument",values);
  
  return (
    <form onSubmit={handleSubmit} className="flex-col p-10">
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          name="title"
          value={title}
          onBlur={(e) => upsertDocument("title", e.target.value)}
          onChange={handleChange}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="w-[80%] flex-col flex gap-6 p-5">
          <TextEditor
            onBlur={upsertDocument}
            setValues={setValues}
            content={content}
            handleChange={handleChange}
          />
          <button
            type="submit"
            disabled={!dirty}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
        <div className="w-[20%]">
          <Versions
            setValues={setValues}
            versionList={values?.versions || []}
          />
        </div>
      </div>
    </form>
  );
}

export default CreateComponent;
