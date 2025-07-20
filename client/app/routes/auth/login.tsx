import { Link, useNavigate } from "react-router";
import {useState} from "react";
import {apiUrl} from "../../config/api";
interface LoginProps {
  change: () => void;
}

export default function Login(props: LoginProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [badAttempt, setBadAttempt] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle successful login, e.g., store token, redirect, etc.
      console.log("Login successful", data);
      setBadAttempt(false);
      // Redirect to dashboard or another page
      navigate("/dashboard");
      console.log("Redirecting to dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setBadAttempt(true);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 bg-background border-2 w-xs h-[500px] flex flex-col items-center">
        <span className="mt-5 text-foreground text-4xl">
          Login
        </span>
        <span className="mt-3 mb-2 text-foreground text-2xl">
          Username/Email
        </span>
        <input className="text-foreground border-1 text-xl w-2xs h-[50px] pl-2 pr-2"
          value={name} onChange={(event)=> {setName(event.target.value)}}
        />
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Password
        </span>
        <div className="flex w-[288px] border-1 text-foreground">
          <input className="text-foreground text-xl w-[242px] h-[50px] pl-2 pr-2"
            type={showPassword ? "text" : "password"}
            value={password} onChange={(event)=> {setPassword(event.target.value)}}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="border-foreground w-[48px] h-[50px] text-md border-l-1">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="h-[40px] flex flex-col items-center justify-center w-xs">
          {badAttempt && <span className="text-danger text-4xs">Invalid username or password</span>} 
        </div>
        <button className="bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:pointer-events-none border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center" 
          onClick={handleLogin} disabled = {!name || !password} 
        >
          <span className="font-Inter text-center text-lg">
            Login
          </span>
        </button>
        <div className="mt-8"/>
        <button className="bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
          onClick={props.change}>
          <span className="font-Inter text-center text-lg">
            Click to Register
          </span>
        </button>
        <div className="mt-4 text-foreground text-sm">
          Forgot your password?{" "}
          <Link to="/reset-password">
            <span className="text-primary hover:text-primary-hover">
              Reset it here.
            </span>
          </Link>
        </div>
      </div>
      <button className="mt-6 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
        onClick={() => {setBadAttempt(!badAttempt)}}>
        <span className="font-Inter text-center text-lg">
          Login With Google
        </span>
      </button>
    </div>
  );
}