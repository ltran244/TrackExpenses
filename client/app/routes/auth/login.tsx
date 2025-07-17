import { Link } from "react-router";

interface LoginProps {
  change: () => void;
}

export default function Login(props: LoginProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 bg-background border-2 w-xs h-[500px] flex flex-col items-center">
        <span className="mt-5 text-foreground text-4xl">
          Login
        </span>
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Username/Email
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2"></input>
        <span className="mt-5 mb-2 text-foreground text-2xl">
          Password
        </span>
        <input className="text-foreground border-1 text-2xl w-2xs h-[50px] pl-2 pr-2"></input>
        <Link to="/dashboard">
          <button className="mt-12 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center">
          <span className="font-Inter text-center text-lg">
            Login
          </span>
        </button>
        </Link>
        <button className="mt-12 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center"
          onClick={props.change}>
          <span className="font-Inter text-center text-lg">
            Click to Register
          </span>
        </button>
      </div>
      <button className="mt-10 bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center">
        <span className="font-Inter text-center text-lg">
          Login With Google
        </span>
      </button>
    </div>
  );
}