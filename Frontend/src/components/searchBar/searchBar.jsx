import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='flex items-center justify-center'>
            <input
                type="text"
                placeholder="Search Notes"
                className='w-100 bg-blue-100 mt-30 p-2 rounded-2xl'
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose
                    className='text-xl flex text-slate-500 cursor-pointer hover:text-black mr-3'
                    onClick={onClearSearch}
                />)}
            <div>

                
            </div>
            <FaMagnifyingGlass
                style={{
                    color: "#9ca3af", // Slate-400
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                }}
                className='mt-30 ml-3'
                onClick={handleSearch}
                onMouseEnter={(e) => e.target.style.color = "#000000"} // hover effect
                onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            />
        </div>
    );
};

export default SearchBar;
