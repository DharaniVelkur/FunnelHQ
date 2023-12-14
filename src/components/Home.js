import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Confetti from './Confetti';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  let user = JSON.parse(localStorage.getItem('Funneluser'));
  let navigate= useNavigate();

  const validuser = async ()=>{
    let token = localStorage.getItem('Funneltoken');
    const res= await fetch("https://funnelhq-backend-ecgm.onrender.com/validuser",{
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
        setIsVisible(true);
    } else {
        navigate("/");
    }
}

  useEffect(()=>{
   validuser();
  },[]);

  const handleLogout = async () => {
    let token = localStorage.getItem("Funneltoken");
    const logoutuser = await fetch("https://funnelhq-backend-ecgm.onrender.com/logout", {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    const data = await logoutuser.json();
    if (logoutuser.status === 200) {
        localStorage.removeItem("Funneltoken");
        localStorage.removeItem("Funneluser");
        navigate("/");
    } else {
        navigate("/*");
    }
};

  return (
   <>
    <div className='font-bold text-center text-orange-500 pt-10' style={{fontSize:"70px"}}>
       {isVisible && <Confetti/>}
      Welcome {user?user.name:""}!!!
    </div>
    <div className='text-center'>
    <button className='font-bold underline' onClick={handleLogout}>Logout&nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>
    </>
  )
}

export default Home;
