import { useState } from "react";
import Login from "./login";
import Register from "./register"
export default function Auth() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  function changeToLogin(){
    setAuthMode("login");
  }
  function changeToRegister(){
    setAuthMode("register");
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      {authMode === 'login' ? <Login change={changeToRegister}/> : 
        <Register change={changeToLogin}/>}
    </div>
  );
}