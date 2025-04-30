// NoteCard.js (Assuming you have a NoteCard component)
import React from "react";

const NoteCard = ({ title, date, content, tags, isPinned, onPinNote, onEdit, onDelete }) => {
    return (
        <div className="note-card">
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{content}</p>
            <div>
                {tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
            <button onClick={onPinNote}>
                {isPinned ? "Unpin" : "Pin"}
            </button>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default NoteCard;
