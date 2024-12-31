/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { randomColorPick, socket } from "@/app/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

function TextEditor(props: any) {
  const { onBlur, handleChange, setValues, content, documentId } = props;
  const authDetail = useSelector((state: RootState) => state.auth.detail);

  const handleCursorMove = (e:any) => {
    const { selectionStart, selectionEnd, id: containerId } = e.target;
    const lines = e.target.value.split('\n');
    const line = lines.findIndex((line:any, index:number) => selectionStart <= line.length + index);

    // Emit cursor position to the server
    socket.emit('cursor-update', {
      userId: authDetail?.userId,
      documentId: documentId,
      position: {
        container: containerId,
        start: selectionStart,
        line: line,
      },
    });

    // Optionally update the cursor for the current user (front-end only)
    updateCursorDisplay(authDetail?.userId, {
      start: selectionStart,
      container: containerId,
      line,
    });
  };


  const handleTextChange = (e: any) => {
    handleChange(e);
    handleCursorMove(e);
    const newText = e.target.value;
    socket.emit("updateDocument", { content: newText });
  };

  const createCursorElement = (userId: string) => {
    const cursor = document.createElement("div");
    cursor.id = `cursor-${userId}`;
    cursor.className = `absolute w-0.5 h-5 bg-[${randomColorPick()}] z-[1000];`;
    cursor.style.position = "absolute";
    cursor.style.width = "2px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = randomColorPick();
    cursor.style.zIndex = "1000";

    document.body.appendChild(cursor);
    return cursor;
  };

  const updateCursorDisplay = (userId:string, position:any) => {
    const cursorElement = document.getElementById(`cursor-${userId}`) || createCursorElement(userId);
  if (position.container) {
    const targetElement = document.getElementById(position.container) as HTMLTextAreaElement;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const offsetX = rect.left;

      const lineHeight = parseInt(window.getComputedStyle(targetElement).lineHeight, 10);
      const textContent = targetElement.value;
      const lineHeightMultiplier = Math.floor(position.start / textContent.length); 
      const offsetY = rect.top + lineHeight * lineHeightMultiplier;

      cursorElement.style.left = `${offsetX + position.start}px`;
      cursorElement.style.top = `${offsetY}px`;
    }
  }
  };
  

  useEffect(() => {
    // Listen for cursor updates from other users
    socket.on(
      "cursor-update",
      (data: {
        userId: string;
        position: { start: number; end: number; container: string };
      }) => {
        console.log("cursor-update from BE",data);
        updateCursorDisplay(data.userId, data.position);
      }
    );
    return ()=>{
      socket.off("cursor-update")
    }
  });

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
        onKeyUp={(e) => {
          handleCursorMove(e); // Track cursor movement in real-time
        }}
        onMouseUp={(e) => {
          handleCursorMove(e); // Update cursor on mouse click/selection
        }}
        onInput={(e) => {
          handleCursorMove(e); // Capture cursor movement during input
        }}
        onChange={handleTextChange}
        rows={20}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}

export default TextEditor;
