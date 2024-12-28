"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

const socket: Socket = io("http://localhost:8080", {
  auth: {
    token: Cookies.get("token"), // Attach token here
  },
});

function TextEditor(props: any) {
  const { onBlur, handleChange, setValues, content } = props;
  // const [documentContent, setDocumentContent] = useState("");

  //   useEffect(() => {
  //     socket.on("load-doc", (data) => {
  //       console.log("Document loaded:", data);
  //       setDocumentContent(data.text);
  //     });

  //     socket.on("update-doc", (data: any) => {
  //       console.log("Document updated:", data);
  //       setDocumentContent(data.text);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  useEffect(() => {
    socket.on("load-document", (content) => {
      setValues((prev:any)=>({...prev, content}))
    });

    socket.on("update-document", (content) => {
      // setDocumentContent(content);
      setValues((prev:any)=>({...prev, content}))
    });

    return () => {
      socket.off("load-document");
      socket.off("update-document");
    };
  }, [setValues]);

  const handleTextChange = (e: any) => {
    handleChange(e)
    const newText = e.target.value;
    // setDocumentContent(newText);
    // socket.emit("update-doc", { text: newText });
    socket.emit("update-document", { content: newText });
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
        value={content}
        id="content"
        name="content"
        onBlur={(e) => onBlur("content", e.target.value)}
        onChange={handleTextChange}
        rows={20}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}

export default TextEditor;
