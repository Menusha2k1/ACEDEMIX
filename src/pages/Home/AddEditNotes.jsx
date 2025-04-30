import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ notedata, type, getAllNotes, onClose }) => {
    const [title, setTitle] = useState(notedata?.title || "");
    const [content, setContent] = useState(notedata?.content || "");
    const [tags, setTags] = useState(notedata?.tags || []);
    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });

            if(response.data && response.data.note){
                getAllNotes();
                onClose();
            }

        } catch(error){
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }
        }
    };

    // Edit Note
    const editNote = async () => {
        const noteId = notedata._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });

            if(response.data && response.data.note){
                getAllNotes();
                onClose();
            }

        } catch(error){
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }

        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div style={{ position: "relative", padding: "20px", background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <button
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    transition: "background 0.3s",
                }}
                onClick={onClose}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e5e7eb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
                <MdClose style={{ fontSize: "20px", color: "#9ca3af" }} />
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#374151" }}>TITLE</label>
                <input
                    type="text"
                    style={{
                        fontSize: "20px",
                        color: "#111827",
                        outline: "none",
                        padding: "5px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                    }}
                    placeholder=""
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#374151" }}>CONTENT</label>
                <textarea
                    type="text"
                    style={{
                        fontSize: "14px",
                        color: "#111827",
                        outline: "none",
                        backgroundColor: "#f9fafb",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #d1d5db",
                        resize: "none",
                        height: "150px",
                    }}
                    placeholder="Content"
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div style={{ marginTop: "15px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#374151" }}>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p style={{ color: "red", fontSize: "12px", paddingTop: "10px" }}>{error}</p>}

            <button
                style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    padding: "10px 15px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background 0.3s",
                }}
                onClick={handleAddNote}
                onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditNotes;
