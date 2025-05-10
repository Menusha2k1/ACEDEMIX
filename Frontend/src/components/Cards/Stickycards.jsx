import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div style={{ 
            border: "1px solid #e2e8f0", 
            borderRadius: "8px", 
            padding: "16px", 
            backgroundColor: "white", 
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h6 style={{ fontSize: "14px", fontWeight: "500", margin: "0" }}>{title}</h6>
                <span style={{ fontSize: "12px", color: "#64748b" }}>{date}</span>
            </div>

            <MdOutlinePushPin 
                style={{
                    cursor: "pointer",
                    color: isPinned ? "#2563eb" : "#cbd5e1",
                    marginTop: "8px"
                }} 
                onClick={onPinNote} 
            />

            <p style={{ fontSize: "12px", color: "#475569", marginTop: "8px" }}>
                {content?.slice(0, 60)}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{tags}</div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
