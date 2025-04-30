import React, { useState, useEffect } from "react";
import { MdOutlinePushPin, MdCreate, MdDelete, MdColorLens } from "react-icons/md";

const pastelColors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF", "#85E3FF", "#B9FBC0"];

const NoteCard = ({ title, date, content, tags, onEdit, onDelete }) => {
    const [bgColor, setBgColor] = useState("white");
    const [showPicker, setShowPicker] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const handleColorChange = (color) => {
        setBgColor(color);
        setShowPicker(false);
    };

    const handlePinNote = () => {
        setIsPinned(!isPinned);
        const updatedNotes = notes.map(note =>
            note.title === title ? { ...note, isPinned: !note.isPinned } : note
        );
        updatedNotes.sort((a, b) => b.isPinned - a.isPinned || a.title.localeCompare(b.title));
        setNotes(updatedNotes);
    };

    return (
        <div style={{ 
            border: "1px solid #e2e8f0", 
            borderRadius: "12px", 
            padding: "16px", 
            backgroundColor: bgColor, 
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            position: "relative",
            cursor: "pointer",
            transform: "scale(1)",
            fontFamily: "'Playfair Display', serif",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333"
        }} 
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} 
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h5 style={{ fontSize: "16px", fontWeight: "bold", margin: "0", color: "#2c3e50" }}>{title}</h5>
                <span style={{ fontSize: "12px", color: "#64748b" }}>{date}</span>
            </div>

            <MdOutlinePushPin 
                style={{
                    cursor: "pointer",
                    color: isPinned ? "#2563eb" : "#cbd5e1",
                    marginTop: "8px"
                }} 
                onClick={handlePinNote} 
            />

            <p style={{ fontSize: "13px", color: "#475569", marginTop: "8px" }}>{content?.slice(0, 60)}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{tags.map((item) => `#${item}`).join(" ")}</div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <MdColorLens 
                        style={{ cursor: "pointer", color: "#6b7280" }} 
                        onClick={() => setShowPicker(!showPicker)} 
                    />
                    {showPicker && (
                        <div style={{
                            position: "absolute",
                            top: "40px",
                            right: "10px",
                            display: "flex",
                            gap: "5px",
                            background: "white",
                            padding: "5px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            zIndex: 10
                        }}>
                            {pastelColors.map(color => (
                                <div 
                                    key={color} 
                                    style={{ 
                                        width: "20px", 
                                        height: "20px", 
                                        backgroundColor: color, 
                                        borderRadius: "50%", 
                                        cursor: "pointer" 
                                    }}
                                    onClick={() => handleColorChange(color)}
                                />
                            ))}
                        </div>
                    )}
                    <MdCreate 
                        style={{ cursor: "pointer", color: "#16a34a" }} 
                        onClick={onEdit} 
                    />
                    <MdDelete 
                        style={{ cursor: "pointer", color: "#dc2626" }} 
                        onClick={onDelete} 
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;