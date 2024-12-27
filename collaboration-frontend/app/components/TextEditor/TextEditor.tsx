"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

const socket: Socket = io("http://localhost:8080", {
  auth: {
    token: Cookies.get("token"), // Attach token here
  },
});

function TextEditor() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load-doc", (data) => {
      console.log("Document loaded:", data);
      setText(data.text);
    });

    socket.on("update-doc", (data: any) => {
      console.log("Document updated:", data);
      setText(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    socket.emit("update-doc", { text: newText });
  };
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your message
      </label>
      <textarea
        value={text}
        id="message"
        onChange={(e: any) => handleTextChange(e.target.value)}
        rows={25}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </>
  );
}

export default TextEditor;
