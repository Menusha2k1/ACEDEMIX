import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import jsPDF from "jspdf";


import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaImage,
  FaFilePdf,
} from "react-icons/fa";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable default lists
        orderedList: false, // Disable default lists
      }),
      ListItem, // ✅ Ensure ListItem is explicitly included
      BulletList,
      OrderedList,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      CodeBlock,
      TextStyle,
      Color,
      Image,
    ],
    content: "<p>Hello, start typing...</p>",
  });

 
  useEffect(() => {
    if (!editor) return;
  }, [editor]);

  if (!editor) return <p>Loading Editor...</p>;

  // ✅ Image Upload Function
  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // ✅ PDF Export Function
  const exportToPDF = () => {
    console.log("Export button clicked!");

    if (!editor) return;

    const pdf = new jsPDF();
    const content = editor.getText();

    if (!content.trim()) {
      alert("No content to export!");
      return;
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(content, 10, 10, { maxWidth: 180 });
    pdf.save("notes.pdf");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Rich Text Editor
      </h2>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 border-b pb-2 bg-gray-100 p-2 rounded">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaUnderline />
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaListUl />
        </button>

        {/* Numbered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaListOl />
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("blockquote") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaQuoteLeft />
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded ${
            editor.isActive("codeBlock") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaCode />
        </button>

        {/* Image Upload Button */}
        <button onClick={addImage} className="p-2 bg-gray-200 rounded">
          <FaImage />
        </button>

        {/* Export to PDF Button */}
        <button onClick={exportToPDF} className="p-2 bg-red-500 text-white rounded">
          <FaFilePdf /> 
        </button>
      </div>

      {/* Editor */}
      <div className="border p-3 min-h-[200px] rounded bg-gray-50">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
