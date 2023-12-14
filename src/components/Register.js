import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [spin, setSpin] = useState(false);
  let navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setSpin(true);
    const data = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:name,
        email: email,
        password: password,
        cpassword:cpassword
      }),
    });
    const response = await data.json();
 
    if(data.status===200){
        setSpin(false);
        setEmail("");
        setPassword("");
        setCPassword("");
        setName("");
        toast.success("User registered successfully");
        navigate("/");

    } else {
        setSpin(false);
        setEmail("");
        setPassword("");
        setPassword("");
        setCPassword("");
        toast.error(response.error);
    }
  };
  
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
        navigate("/register")
    }
}
  useEffect(()=>{
    validuser();
},[])


  return (
    <>
      
      <div className=" bg-gradient-to-b from-pink-300 pt-16 ">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <p className="font-bold font-serif p-4" style={{fontSize:"40px"}}>Registration Form</p>
          <input
            type="text"
            placeholder="Name"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <input
            type="email"
            placeholder="Email address"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <input
            type="password"
            placeholder="Confirm Password"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />

          <button
            className="w-8/12 p-3 mt-3 mb-10 border rounded-lg font-bold font-serif bg-yellow-300"
            onClick={registerUser}
          >
            {spin ? (
              <span className="spinner-border spinner-border-sm text-dark " role="status">
                {/* <span class="visually-hidden">Loading...</span> */}
              </span>
            ) : (
              "Register"
            )}
          </button>
          <p className=" pb-6 ">
            Already an User?&nbsp;
            <Link to={'/'}><span className="cursor-pointer hover:text-lime-500 font-bold">
              Login Now.
            </span></Link>
          </p>
          {/* <p className=" pb-6 cursor-pointer hover:underline font-bold">Forgot Password?</p> */}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Register;
