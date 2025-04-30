import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1.5px solid #ccc",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "12px",
        }}>
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                style={{
                    width: "100%",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    paddingRight: "12px",
                }}
            />

            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    style={{ color: "#007bff", cursor: "pointer" }}
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    style={{ color: "#94a3b8", cursor: "pointer" }}
                    onClick={toggleShowPassword}
                />
            )}
        </div>
    );
};

export default PasswordInput;
