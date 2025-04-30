import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import moment from "moment";
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({isShown:true, data: noteDetails, type: "edit"});
    };

    // Get all notes
    const getAllNotes = async () => {
        try{
            const response = await axiosInstance.get("/get-all-notes");

            if(response.data && response.data.notes){
                setAllNotes(response.data.notes);
            }
        } catch (error){
            console.log("An unexpected error occurred. Try Again");
        }
    };

    // Delete Note
    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);
            if(response.data && !response.data.error){
                getAllNotes();
            }
        } catch(error){
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    // Search for a note
    const onSearchNote = async (query) => {
        try{
            const response = await axiosInstance.get("/search-notes", {
                params: {query},
            });

            if(response.data && response.data.notes){
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        }catch(error){
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    useEffect(() => {
        getAllNotes();
    }, []); 

    return (
        <>
            <Navbar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

            <div style={{ 
                width: "90%", 
                margin: "0 auto", 
                background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", 
                padding: "20px", 
                borderRadius: "12px", 
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" 
            }}>
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                    gap: "20px", 
                    marginTop: "20px" 
                }}>
                    {allNotes.map((item, index) => (
                         <NoteCard 
                         key={item._id}
                         title={item.title}
                         date={moment(item.createdOn).format('Do MMM YYYY')}
                         content={item.content}
                         tags={item.tags}
                         isPinned={item.isPinned}
                         onEdit={() => handleEdit(item)}
                         onDelete={() => deleteNote(item)}
                         onPinNote={() => {}}
                     />
                    ))}
                </div>
            </div>

            <button 
                style={{
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
                    color: "white",
                    border: "none",
                    position: "fixed",
                    right: "40px",
                    bottom: "40px",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                }}
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
                <MdAdd style={{ fontSize: "32px" }} />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "40%",
                        maxHeight: "75vh",
                        background: "#fff",
                        borderRadius: "12px",
                        margin: "60px auto",
                        padding: "20px",
                        overflowY: "auto",
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
                    }
                }}
                contentLabel=""
            >
                <AddEditNotes 
                    type={openAddEditModal.type}
                    notedata={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes}
                />
            </Modal>
        </>
    );
}

export default Home;
