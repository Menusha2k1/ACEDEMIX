import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError(""); // Clear error

        //Login API Call
        try{
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error){
            
        }
    };

    return (
        <>
        <Navbar />

        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '112px', // mt-28
        }}>
            <div style={{
                width: '384px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: 'white',
                padding: '40px 28px',
            }}>
                <form onSubmit={handleLogin}>
                    <h4 style={{
                        fontSize: '24px',
                        marginBottom: '28px',
                    }}>Login</h4>

                    <input
                        type="text"
                        placeholder="Email"
                        style={{
                            width: '100%',
                            padding: '11px',
                            fontSize: '14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            marginBottom: '16px',
                            outline: 'none',
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p style={{
                        color: 'red',
                        fontSize: '12px',
                        paddingBottom: '8px',
                    }}>{error}</p>}

                    <button type="submit" style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#1d4ed8', // Primary blue
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}>
                        Login
                    </button>

                    <p style={{
                        fontSize: '12px',
                        textAlign: 'center',
                        marginTop: '16px',
                    }}>
                        Not registered yet?{" "}
                        <Link to="/signup" style={{
                            fontWeight: '500',
                            color: '#1d4ed8', // Primary blue
                            textDecoration: 'underline',
                        }}>
                            Create an Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;
