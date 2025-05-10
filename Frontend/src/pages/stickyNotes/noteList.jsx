import React, { useState } from 'react';
import NoteCard from '../../components/Cards/Stickycards';
import { MdAdd } from "react-icons/md";
import AddEditNotes from './addNote';
import Modal from "react-modal";
import Navbar from '../../components/Navbar/navbar'
import SearchBar from '../../components/searchBar/searchBar'


const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const handleSearch = () => {};

    const onClearSearch = () => {
        setSearchQuery("");
    }



    return (
        <>
            <Navbar />
            <SearchBar 
                value={searchQuery}
                onChange={({target}) => {
                    setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <div style={{ width: "90%", margin: "0 auto" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginTop: "100px"
                }}>
                    <NoteCard
                        title="Meeting on 7th April"
                        date="3rd Apr 2024"
                        content="Discussing upcoming project milestones and timelines."
                        tags="#Meeting #Project"
                        isPinned={true}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onPinNote={() => { }}
                    />

                    <NoteCard
                        title="Team Lunch on 10th April"
                        date="3rd Apr 2024"
                        content="Plan for a team lunch at the new cafe down the street."
                        tags="#TeamLunch #Event"
                        isPinned={false}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onPinNote={() => { }}
                    />

                    <NoteCard
                        title="Client Call on 12th April"
                        date="5th Apr 2024"
                        content="Preparation for the client call regarding the new project."
                        tags="#ClientCall #Meeting"
                        isPinned={true}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onPinNote={() => { }}
                    />

                    <NoteCard
                        title="Weekly Standup - 7th April"
                        date="6th Apr 2024"
                        content="Catch up with the team to discuss progress and blockers."
                        tags="#Standup #TeamMeeting"
                        isPinned={false}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onPinNote={() => { }}
                    />

                </div>
            </div>

            <button
                style={{
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    position: "absolute",
                    right: "40px",
                    bottom: "40px",
                    cursor: "pointer",
                    transition: "background 0.3s",
                }}
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
            >
                <MdAdd style={{ fontSize: "32px" }} />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "40%",
                        maxHeight: "75vh",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        margin: "60px auto",
                        padding: "20px",
                        overflowY: "auto",
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
                />
            </Modal>
        </>
    );
}

export default Home;
