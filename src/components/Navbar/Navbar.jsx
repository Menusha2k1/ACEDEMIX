import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    return (
        <div style={{
            background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            marginBottom: '20px',
        }}>
            <h2 style={{
                fontSize: '24px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '600',
                color: '#111827',
                paddingTop: '8px',
                paddingBottom: '8px',
            }}>
                STICKY NOTES
            </h2>

            <SearchBar 
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
                style={{
                    width: '300px',
                    fontFamily: "'Playfair Display', serif",
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: '1px solid #ddd',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            />
            <ProfileInfo 
                onLogout={onLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                }}
            />
        </div>
    );
};

export default Navbar;
