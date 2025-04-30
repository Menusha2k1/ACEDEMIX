import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from "../../utils/helper";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name){
            setError("Please enter your name");
            return;
        }

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if (!password){
            setError("Please enter the password");
        }

        setError('')

        // SignUp API Call
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
                <form onSubmit={handleSignUp}>
                    <h4 style={{
                        fontSize: '24px',
                        marginBottom: '28px',
                    }}>SignUp</h4>

                    <input
                        type="text"
                        placeholder="Name"
                        style={{
                            width: '100%',
                            padding: '11px',
                            fontSize: '14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            marginBottom: '16px',
                            outline: 'none',
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        Create Account
                    </button>

                    <p style={{
                        fontSize: '12px',
                        textAlign: 'center',
                        marginTop: '16px',
                    }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{
                            fontWeight: '500',
                            color: '#1d4ed8', // Primary blue
                            textDecoration: 'underline',
                        }}>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        </>
    );
}

export default SignUp;
