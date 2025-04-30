import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({onLogout}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {getInitials("")}
            </div>
            <div>
                <p style={{ fontSize: "14px", fontFamily: "'Playfair Display', serif", fontWeight: "500", margin: "0" }}>PRAMUDI</p>
                <button 
                    style={{ 
                        fontSize: "14px", 
                        color: "#475569", 
                        textDecoration: "underline", 
                        background: "none", 
                        border: "none", 
                        cursor: "pointer",
                        padding: "0"
                    }} 
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
