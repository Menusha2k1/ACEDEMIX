import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div style={{
            width: "320px",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            fontFamily: "'Playfair Display', serif",
            backgroundColor: "#e5e7eb", // Slate-100
            borderRadius: "8px",
        }}>
            <input
                type="text"
                placeholder="Search Notes"
                style={{
                    width: "100%",
                    fontSize: "12px", // Text-xs
                    fontFamily: "'Playfair Display', serif",
                    backgroundColor: "transparent",
                    padding: "11px 0",
                    outline: "none",
                    border: "none",
                }}
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose 
                className='text=xl text-slate-500 cursor-pointer hover:text-black mr-3' 
                onClick={onClearSearch} 
                />)}

            <FaMagnifyingGlass
                style={{
                    color: "#9ca3af", // Slate-400
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                }}
                onClick={handleSearch}
                onMouseEnter={(e) => e.target.style.color = "#000000"} // hover effect
                onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            />
        </div>
    );
};

export default SearchBar;
