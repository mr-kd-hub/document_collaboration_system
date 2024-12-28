/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { socket } from "@/app/helper";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

function TextEditor(props: any) {
  const { onBlur, handleChange, setValues, content, documentId } = props;
  
  // useEffect(() => {
  //   if (documentId) {

  //     // Join the document room
  //     socket.emit('join-document', documentId);

  //     // Join the document room and load the document content
  //     socket.emit('load-document', documentId);

  //     // Listen for the document's initial content
  //     socket.on('documentState', (payload) => {
  //       setValues((prev:any)=>({...prev,content:payload?.content, title:payload?.title}));
  //     });

  //     // Listen for real-time updates from other users
  //     socket.on('updateDocument', (payload) => {
  //       console.log("emit updateDocument",documentId,payload);
  //       setValues((prev:any)=>({...prev,content:payload.content,title: payload.title}));
  //     });

  //     // Cleanup event listeners when the component unmounts
  //     return () => {
  //       socket.emit('leave-document', documentId); // Optional: notify server about leaving
  //       socket.off('documentState');
  //       socket.off('updateDocument');
  //     };
  //   }
  // }, [documentId,setValues]);

  const handleTextChange = (e: any) => {
    handleChange(e)
    const newText = e.target.value;
    socket.emit('updateDocument', {content: newText});
  };
  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label>
      <textarea
        value={content || ""}
        id="content"
        name="content"
        // onBlur={(e) => onBlur("content", e.target.value)}
        onChange={handleTextChange}
        rows={20}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}

export default TextEditor;
