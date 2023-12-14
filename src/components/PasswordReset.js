import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState(false);
    let [spin,setSpin]=useState(false);
    let navigate= useNavigate();

    const sendLink = async (e) => {
        setSpin(true);
        e.preventDefault();
        const res = await fetch('http://localhost:8000/sendpasswordlink', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        let data = await res.json();
        if (res.status === 200) {
            setSpin(false);
            setEmail("");
            setMessage(true);
        } else {
            setSpin(false);
            setEmail("");
            toast.error(data.error);
        }
    }

    
  const validuser = async ()=>{
    let token = localStorage.getItem('Funneltoken');
    const res= await fetch("http://localhost:8000/validuser",{
        method:"GET",
        headers:{
            "Access-Control-Allow-Origin":true,
            "Accept":"application/json",
            "Authorization":token
        }
    })
    const data =await res.json();
    if(res.status===200){
        navigate("/home");
    } else {
        navigate("/resetpassword")
    }
}
let token = localStorage.getItem('Funneltoken');
  useEffect(()=>{
    validuser();
},[]);

    return (
        <>
           <div className="bg-gradient-to-b from-yellow-300 pt-16 ">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <p className="font-bold font-serif p-4" style={{fontSize:"30px"}}>Enter Your Email Address</p>
          {message?<p className='text-green-500'>Email sent successfully!!!</p>:""}
           <input
            type="email"
            placeholder="Email address"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <button
            className="w-8/12 p-3 mt-3 mb-10 border rounded-lg font-bold font-serif bg-yellow-300"
            onClick={sendLink}
          >
            {spin ? (
              <span className="spinner-border spinner-border-sm text-dark " role="status">
                {/* <span class="visually-hidden">Loading...</span> */}
              </span>
            ) : (
              "Send"
            )}
          </button>
          <p className=" pb-6 ">
            <Link to={'/'}><span className="cursor-pointer hover:text-lime-500 font-bold">
              &larr;Back to Login
            </span></Link>
          </p>
          {/* <p className=" pb-6 cursor-pointer hover:underline font-bold">Forgot Password?</p> */}
        </div>
      </div>
      <ToastContainer/> 
        </>
    )
}

export default PasswordReset;
