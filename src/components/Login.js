import React, { useState,useEffect } from "react";
import usericon from "../utils/usericon.png";
import login from "../utils/login.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spin, setSpin] = useState(false);
  let navigate= useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setSpin(true);
    const data = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await data.json();
 
    if(data.status===200){
        setSpin(false);
        setEmail("");
        setPassword("");
        localStorage.setItem('Funneluser',JSON.stringify(response.result.uservalid));
        localStorage.setItem('Funneltoken',response.result.token);
        toast.success("Logged in Successfully!!");
        navigate('/home');
    } else {
        setSpin(false);
        setEmail("");
        setPassword("");
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
        navigate("/")
    }
}
  useEffect(()=>{
    validuser();
},[])


  return (
    <>
      <img src={login} className="absolute h-full w-full" />
      <div className=" pt-28 ">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <img
            src={usericon}
            alt="user"
            className="w-36 left-0 right-0 mx-auto"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button
            className="w-8/12 p-3 mt-3 mb-10 border rounded-lg font-bold font-serif text-white"
            onClick={loginUser}
          >
            {spin ? (
              <span className="spinner-border spinner-border-sm text-dark " role="status">
                {/* <span class="visually-hidden">Loading...</span> */}
              </span>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-white pb-2 ">
            New User?&nbsp;
            <Link to={'/register'}><span className="cursor-pointer hover:text-lime-500 font-bold">
              Register Now.
            </span></Link>
          </p>
          <p className="text-white pb-6 cursor-pointer hover:underline font-bold" onClick={()=>navigate('/resetpassword')}>Forgot Password?</p>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Login;
