import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Error from "./components/Error";
import Home from "./components/Home";

function App() {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/resetpassword" element={<PasswordReset/>}/>
      <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/*" element={<Error/>}/>
    </Routes>
    </>
  );
}

export default App;
