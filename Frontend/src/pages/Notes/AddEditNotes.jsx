import React, { useState } from 'react';
import TagInput from '../../components/Inputs/TagInput';
import { MdAdd, MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance'; // Adjust the import based on your project structure

const AddEditNotes = ({ noteDate, type, getAllNotes, onClose, data }) => {
    const [title, setTitle] = useState(data?.title || ""); // Pre-fill for editing
    const [content, setContent] = useState(data?.content || "");
    const [tags, setTags] = useState(data?.tags || []);
    const [error, setError] = useState(null);

    // Add Note
    const AddNewNote = async () => {
        try {
            const response = await axiosInstance.post('/add-note', {
                title,
                content,
                tags,
                date: noteDate,
            });

            if (response.data && response.data.note) {
                getAllNotes(); // Refresh the notes list
                onClose(); // Close modal
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            }
        }
    };

    // Edit Note
    const EditNote = async () => {
        try {
            const response = await axiosInstance.put(`/edit-note/${data.id}`, {
                title,
                content,
                tags,
            });

            if (response.data.success) {
                getAllNotes(); // Refresh the notes list
                onClose(); // Close modal
            }
        } catch (error) {
            console.error(error);
            setError("Failed to edit note.");
        }
    };

    const handleAddNote = () => {
        if (!title || !content) {
            setError("Title and content are required.");
            return;
        }
        setError(""); 

        if (type === 'edit') {
            EditNote();
        } else {
            AddNewNote();
        }
    };

    return (
        <div className="relative">
            {/* Close button positioned at the top-right corner */}
            <button 
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input 
                    type="text" 
                    className="text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-gray-500" 
                    placeholder="Enter title here..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea  
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-md border border-gray-300 focus:border-gray-500" 
                    placeholder="Enter content here..." 
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
                onClick={handleAddNote}
            >
                {type === "edit" ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default AddEditNotes;
