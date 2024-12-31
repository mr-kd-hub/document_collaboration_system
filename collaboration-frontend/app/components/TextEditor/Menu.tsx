/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { 
  AiOutlineBold, 
  AiOutlineItalic, 
  AiOutlineStrikethrough, 
  AiOutlineCode, 
  AiOutlineUndo, 
  AiOutlineRedo 
} from "react-icons/ai";
import { 
  BsListUl, 
  BsListOl, 
  BsBlockquoteLeft 
} from "react-icons/bs";
// import { 
//   HiOutlineMinus 
// } from "react-icons/hi";
import { 
  MdHorizontalRule 
} from "react-icons/md";
import { 
  FaHeading 
} from "react-icons/fa";
import { Button } from "@mui/material";

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  return (
    <div className="menu-bar flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-300">
      {/* Text Styles */}
      <div className="button-group flex items-center gap-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`btn ${editor.isActive("bold") ? "is-active" : ""}`}
          title="Bold"
        >
          <AiOutlineBold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`btn ${editor.isActive("italic") ? "is-active" : ""}`}
          title="Italic"
        >
          <AiOutlineItalic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`btn ${editor.isActive("strike") ? "is-active" : ""}`}
          title="Strikethrough"
        >
          <AiOutlineStrikethrough />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`btn ${editor.isActive("code") ? "is-active" : ""}`}
          title="Inline Code"
        >
          <AiOutlineCode />
        </Button>
        <Button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="btn"
          title="Clear Marks"
        >
          Clear Marks
        </Button>
      </div>

      {/* Paragraph, Headings, and Block Types */}
      <div className="button-group flex items-center gap-2">
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`btn ${editor.isActive("paragraph") ? "is-active" : ""}`}
          title="Paragraph"
        >
          P
        </Button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`btn ${
              editor.isActive("heading", { level }) ? "is-active" : ""
            }`}
            title={`Heading ${level}`}
          >
            <FaHeading /> {level}
          </Button>
        ))}
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn ${editor.isActive("bulletList") ? "is-active" : ""}`}
          title="Bullet List"
        >
          <BsListUl />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn ${editor.isActive("orderedList") ? "is-active" : ""}`}
          title="Ordered List"
        >
          <BsListOl />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`btn ${editor.isActive("blockquote") ? "is-active" : ""}`}
          title="Blockquote"
        >
          <BsBlockquoteLeft />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`btn ${editor.isActive("codeBlock") ? "is-active" : ""}`}
          title="Code Block"
        >
          <AiOutlineCode />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="btn"
          title="Horizontal Rule"
        >
          <MdHorizontalRule />
        </Button>
      </div>

      {/* Utility Buttons */}
      <div className="button-group flex items-center gap-2">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          className="btn"
          title="Undo"
        >
          <AiOutlineUndo />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          className="btn"
          title="Redo"
        >
          <AiOutlineRedo />
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
