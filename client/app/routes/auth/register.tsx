import { useState } from "react";
import { apiUrl } from "../../config/api";

interface RegisterProps {
  change: () => void;
}

export default function Register(props:RegisterProps) {
  // States to manage registration form inputs
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // States to manage registration validation
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);
  const [passwordLengthNotValid, setPasswordLengthNotValid] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [unvalidEmail, setUnvalidEmail] = useState(false);
  const [userNameUsed, setUserNameUsed] = useState(false);
  // State to manage visibility of password fields
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    // Logic to handle registration, e.g., API call
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setUnvalidEmail(true);
      return;
    } else {
      setUnvalidEmail(false);
    }
    if (password.length < 8) {
      setPasswordLengthNotValid(true);
      return;
    } else {
      setPasswordLengthNotValid(false);
    }
    if (password !== confirmPassword) {
      setPasswordsNotMatch(true);
      return;
    }
    else{
      setPasswordsNotMatch(false);
    }
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userName, password }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          console.log(data);
          data.emailUsed ? setEmailUsed(true) : setEmailUsed(false);
          data.userNameUsed ? setUserNameUsed(true) : setUserNameUsed(false);
          data.passwordError ? setPasswordLengthNotValid(true) : setPasswordLengthNotValid(false);
          data.invalidEmail ? setUnvalidEmail(true) : setUnvalidEmail(false);
        }
        throw new Error("Registration failed, code: " + response.status);
      }
      // Handle successful registration, e.g., store token, redirect, etc.
      console.log("Registration successfull for " + email);
      // Redirect to login after successful registration
      props.change();
    } catch (error) {
      console.error("Registration error:", error);
    }
  }
  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 bg-background border-2 w-xs h-[700px] flex flex-col items-center">
        <span className="mt-5 text-foreground text-4xl">
          Register
        </span>
        <span className="mt-3 mb-2 text-foreground text-2xl">
          Enter Email
        </span>
        <input className="text-foreground border-1 text-xl w-2xs h-[50px] pl-2 pr-2" 
          value={email} onChange={(event) => { setEmail(event.target.value) }}
        />
        <div className="h-[20px] w-2x text-lg text-danger">
          {unvalidEmail ? "Invalid email format" : emailUsed ? "Email already in use" : null}
        </div>
        <span className="mb-2 text-foreground text-2xl">
          Select Username
        </span>
        <input className="text-foreground border-1 text-xl w-2xs h-[50px] pl-2 pr-2" 
          value={userName} onChange={(event) => { setUserName(event.target.value) }}
        />
        <div className="h-[20px] w-2x text-lg text-danger">
          {userNameUsed ? "Username already in use" : null}
        </div>
        <span className="mb-2 text-foreground text-2xl">
          Select Password
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
        <div className="h-[20px] w-2x text-lg text-danger">
          {passwordLengthNotValid ? "Password must be at least 8 characters" : null}
        </div>
        <span className="mb-2 text-foreground text-2xl">
          Confirm Password
        </span>
        <div className="flex w-[288px] border-1 text-foreground">
          <input className="text-foreground text-xl w-[242px] h-[50px] pl-2 pr-2"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword} onChange={(event)=> {setConfirmPassword(event.target.value)}}
          />
          <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="border-foreground w-[48px] h-[50px] text-md border-l-1">
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="h-[20px] w-2x text-lg text-danger">
          {passwordsNotMatch ? "Passwords do not match" : null}
        </div>
        <button className="mt-4 bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:pointer-events-none border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
          onClick={handleRegister} disabled={!email || !userName || !password || !confirmPassword}
        >
          <span className="font-Inter text-center text-lg">
            Sign Up
          </span>
        </button>
        <button className="mt-8 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
          onClick={props.change}>
          <span className="font-Inter text-center text-lg">
            Have an account? Login
          </span>
        </button>
      </div>
      {/* <button className="mt-6 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center">
        <span className="font-Inter text-center text-lg">
          Sign Up With Google
        </span>
      </button> */}
    </div>
  );
}