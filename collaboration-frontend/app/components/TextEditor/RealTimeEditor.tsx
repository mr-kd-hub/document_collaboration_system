/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { socket } from "@/app/helper";
import "ckeditor5/ckeditor5.css";
import {
  useEditor,
  EditorContent,
  useCurrentEditor,
  EditorProvider,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import MenuBar from "./Menu";

function TextEditor(props: any) {
  const { onBlur, handleChange, setValues, content, documentId } = props;
  const authDetail = useSelector((state: RootState) => state.auth.detail);
  console.log("content",content);
    
    const editor = useEditor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight,
        Document,
        Paragraph,
        Text,
      ],
      content: content ?? "",
      onUpdate({ editor }) {
        const newText = editor.getHTML();
        setValues((prev: any) => ({ ...prev, content: newText }));
        socket.emit("updateDocument", { content: newText });
      },
    });
    // useEffect(() => {
    //     console.log("dssf");
    //     editor?.commands.insertContent(content);
    //     // editor.commands.setContent(content)
    //   }, [editor,content])

  const createCursorElement = (userId: string) => {
    const cursor = document.createElement("div");
    cursor.id = `cursor-${userId}`;
    cursor.className = "absolute w-0.5 h-5 bg-[red] z-[1000];";
    cursor.style.position = "absolute";
    cursor.style.width = "2px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "red";
    cursor.style.zIndex = "1000";

    document.body.appendChild(cursor);
    return cursor;
  };

  const updateCursorDisplay = (userId: string, position: any) => {
    const cursorElement =
      document.getElementById(`cursor-${userId}`) ||
      createCursorElement(userId);
    if (position.container) {
      const targetElement = document.getElementById(position.container);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const lineHeight = parseInt(
          window.getComputedStyle(targetElement).lineHeight,
          10
        );
        const offsetX = rect.left;
        const offsetY = rect.top + lineHeight * position.line; // Account for the line position

        cursorElement.style.left = `${offsetX + position.start}px`; // Horizontal position
        cursorElement.style.top = `${offsetY}px`; // Vertical position (adjusted by line height)
      }
    }
  };

  const handleCursorMove = (e: any) => {
    console.log("e", e.target);

    const { selectionStart, selectionEnd, id: containerId } = e.target;
    const lines = e?.target?.value?.split("\n");
    const line = lines.findIndex(
      (line: any, index: number) => selectionStart <= line.length + index
    );

    // Emit cursor position to the server
    socket.emit("cursor-update", {
      userId: authDetail?.userId,
      documentId: documentId,
      position: {
        container: containerId,
        start: selectionStart,
        end: selectionEnd,
        line: line,
      },
    });

    // Optionally update the cursor for the current user (front-end only)
    updateCursorDisplay(authDetail?.userId, {
      start: selectionStart,
      end: selectionEnd,
      container: containerId,
      line,
    });
  };

  useEffect(() => {
    // Listen for cursor updates from other users
    socket.on(
      "cursor-update",
      (data: {
        userId: string;
        position: { start: number; end: number; container: string };
      }) => {
        console.log("cursor-update from BE", data);

        updateCursorDisplay(data.userId, data.position);
      }
    );
    return () => {
      socket.off("cursor-update");
    };
  });

  const handleTextChange = (e: any) => {
    //   handleChange(e);
    //   handleCursorMove(e);
    const newText = e.target.value;
    console.log("newText0",newText);
    
    setValues((prev: any) => ({ ...prev, content: newText }));
    socket.emit("updateDocument", { content: newText });
  };

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        editor={editor}
        value={content}
        rows={20}
        draggable={true}
        name="content"
        // onChange={handleTextChange}
        // onKeyUp={(e) => {
        //   handleCursorMove(e); // Track cursor movement in real-time
        // }}
        // onMouseUp={(e) => {
        //   handleCursorMove(e); // Update cursor on mouse click/selection
        // }}
        // onInput={(e) => {
        //   handleCursorMove(e); // Capture cursor movement during input
        // }}
      />
    </div>
  );
}

export default TextEditor;
