import React, { useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import { Link, useNavigate } from 'react-router-dom';
import Password from '../../components/Inputs/passwordinput'
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';




const signup = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState(null);

 const navigate = useNavigate();

 const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
        setError("Please enter your name");
        return
    }
    if(!validateEmail(email)){
        setError("Please enter your email");
        return
    }
    if(!password){
        setError("Please enter your password");
        return
    }
    setError("");
    try {
        const response = await axiosInstance.post("/create_account" , {
           name: name,
           email: email,
           password: password, 
        });
        if (response.data && response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            navigate('/login');
            
        }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("Error")
            }
    }

 }
  return <>
    <div className='flex items-center justify-center mt-15 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>
    <div className="absolute top-0  left-0 w-48 h-48 bg-green-500 transform -translate-x-1/6 -translate-y-1/2 rounded-full opacity-50"></div>
    <div className="absolute bottom-10 right-0 w-70 h-48 bg-blue-500 transform translate-x-1/2 translate-y-1/2 rounded-full opacity-50"></div>
        <div className="w-100 rounded-3xl bg-white p-10 z-1" >
            <form onSubmit={handleSignup}>
                
                <h4 className='text-center text-3xl mb-6'>Welcome to ACEDEMIX</h4>
                <h4 className="text-center text-sm mb-8">Sign up and start taking notes</h4>

                <input 
                type="text" 
                placeholder="Name" 
                className="input-box" 
                value={name}
                onChange={(e) => setName(e.target.value)}
               
                />
                 <input 
                type="text" 
                placeholder="Email" 
                className="input-box" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
                />

                <Password
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>} 
                <button type='submit' className='btn-primary'>Sign Up</button> 

                <p className='text-sm text-center mt-4'>Already have an account?{''}
                    <Link to="/login" className='font-medium text-blue text-primary underline text-blue-600'> Login </Link>
                </p>               
            </form> 
        </div>
    </div>
    </>;
}

export default signup
