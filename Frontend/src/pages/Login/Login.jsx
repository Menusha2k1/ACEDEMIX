import React, { useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Password from '../../components/Inputs/passwordinput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)){
            setError("Please enter a valid email")
            return;     
        }
        if (!password){
            setError("Please enter password")
           return;
        }
        setError("");
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });
            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('name',response.data.email)
                navigate('/');
                
             
               
              }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("dslijfhmuodius1111111111111111111111")
            }
        }

    };
  return <>
    <div className='flex items-center justify-center mt-28 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>
    <div className="absolute top-0  left-0 w-48 h-48 bg-green-500 transform -translate-x-1/6 -translate-y-1/2 rounded-full opacity-50"></div>
    <div className="absolute bottom-10 right-0 w-70 h-48 bg-blue-500 transform translate-x-1/2 translate-y-1/2 rounded-full opacity-50"></div>
        <div className="w-100 rounded-3xl bg-white p-10 z-1" >
            <form onSubmit={handleLogin}>
                <h4 className="text-3xl mb-8">Login</h4>

                <input 
                type="text" 
                placeholder="Email" 
                className="input-box" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                <button type='submit' className='btn-primary'>Login</button> 

                <p className='text-sm text-center mt-4'>Not registered yet?{''}
                    <Link to="/signup" className='font-medium text-blue text-primary underline text-blue-600'> Create an Account </Link>
                </p>               
            </form> 
        </div>
    </div>
  </>;
}

export default Login
