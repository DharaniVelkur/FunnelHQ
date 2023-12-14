import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Error from "./components/Error";
import Home from "./components/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
    <GoogleOAuthProvider  clientId="825956741767-ogc3mt3a2tqi4aknda6ddglmkk0cq8d5.apps.googleusercontent.com">
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/resetpassword" element={<PasswordReset/>}/>
      <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/*" element={<Error/>}/>
    </Routes>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
