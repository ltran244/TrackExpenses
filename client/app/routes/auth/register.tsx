import { Link } from "react-router";
import { useState } from "react";
interface RegisterProps {
  change: () => void;
}

export default function Register(props:RegisterProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 bg-background border-2 w-xs h-[700px] flex flex-col items-center">
        <span className="mt-5 text-foreground text-3xl">
          Register
        </span>
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Enter Email
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2" 
          value={email} onChange={(event) => { setEmail(event.target.value) }}
        />
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Select Username
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2"/>
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Select Password
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2"
          value={password} type='password' onChange={(event) => { setPassword(event.target.value) }}
        />
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Confirm Password
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2"
          value={confirmPassword} type='password' onChange={(event) => { setConfirmPassword(event.target.value) }}
        />
        <Link to="/dashboard" >
          <button className="mt-10 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center">
          <span className="font-Inter text-center text-lg">
            SignUp
          </span>
        </button>
        </Link>
        <button className="mt-12 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
          onClick={props.change}>
          <span className="font-Inter text-center text-lg">
            Have an account? Login
          </span>
        </button>
      </div>
      <button className="mt-10 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center">
        <span className="font-Inter text-center text-lg">
          Sign Up With Google
        </span>
      </button>
    </div>
  );
}