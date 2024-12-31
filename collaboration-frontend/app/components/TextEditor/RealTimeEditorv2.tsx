/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { socket } from "@/app/helper";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};
function RealTimeEditorv2(props: any) {
  const { onBlur, handleChange, setValues, content, documentId } = props;
  const ejInstance: any = useRef(null);
  console.log("------", content);

  const saveCaretPosition = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    return {
      range,
    };
  };

  const restoreCaretPosition = (caret: any) => {
    if (!caret || !caret.range) return;
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(caret.range);
    }
  };
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: content?.length
        ? {
            time: new Date().getTime(),
            blocks: [...content],
          }
        : undefined,
      onChange: async () => {
        const content = await editor.saver.save();
        setValues((prev: any) => ({ ...prev, content: content.blocks }));
        socket.emit("updateDocument", { content: content.blocks });
      },
      tools: {
        header: Header,
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const syncBlocks = async () => {
    const editor = ejInstance.current;
    if (!editor || !Array.isArray(content)) return; // Ensure content is an array
  
    // Fetch current editor blocks
    const currentContent = await editor.saver.save();
    const currentBlocks = currentContent.blocks;
  
    // Compare blocks and apply changes
    const incomingBlocks = content; // Ensure `content` is treated as an array
  
    // 1. Remove extra blocks
    if (currentBlocks.length > incomingBlocks.length) {
      for (let i = currentBlocks.length - 1; i >= incomingBlocks.length; i--) {
        editor.blocks.delete(i);
      }
    }
  
    // 2. Update existing blocks or add new ones
    incomingBlocks.forEach((block, index) => {
      const currentBlock = currentBlocks[index];
  
      if (!currentBlock) {
        // Add new block if it doesn't exist
        editor.blocks.insert(block.type, block.data, {}, index, true);
      } else if (
        currentBlock.type !== block.type ||
        JSON.stringify(currentBlock.data) !== JSON.stringify(block.data)
      ) {
        // Update block if content or type differs
        editor.blocks.update(index, block.data);
      }
    });
  };
  
  useEffect(() => {
    // Synchronize blocks when `content` changes
    syncBlocks();
  }, [content]);

// useEffect(() => {
//     // Update editor content when `content` prop changes
//     if (ejInstance.current && content?.length) {
//       const editor = ejInstance.current;

//       (async () => {
//         const currentContent = await editor.saver.save();
//         const currentBlocks = currentContent.blocks;
//         const newBlocks = [...content];

//         // Compare and update blocks
//         if (JSON.stringify(currentBlocks) !== JSON.stringify(newBlocks)) {
//           newBlocks.forEach((block, index) => {
//             if (!currentBlocks[index] || currentBlocks[index].data.text !== block.data.text) {
//               editor.blocks.insert(block.type, block.data, {}, index, true);
//             }
//           });
//         }
//       })();
//     }
//   }, [content]);
  return (
    <>
      <div
        id="editorjs"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></div>
    </>
  );
}

export default RealTimeEditorv2;
