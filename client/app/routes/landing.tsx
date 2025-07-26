import type { Route } from "./+types/landing";
import {Link} from "react-router"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "TrackExpenses" },
    { name: "Website to track expenses", content: "Start Tracking Expenses!" },
  ];
}

export default function Landing() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <h1 className="mt-4 text-foreground font-Inter text-center text-4xl sm:text-5xl lg:text-6xl">
        Track Your Money!
      </h1>
      <div className="bg-background mt-4 max-w-xs min-w-xs sm:max-w-sm sm:min-w-sm lg:max-w-xl lg:min-w-xl items-center flex flex-col ">
        <h1 className="text-foreground text-center text-lg sm:text-xl lg:text-2xl">
          Stop wondering where your money goes. Start recording your daily expenses and see exactly how your
          spending adds up over time. With TrackExpenses, managing your finances is simple, fast, and stress-free.
        </h1>
        <Link to="/login">
          <button className="mt-6 bg-primary hover:bg-primary-hover w-[200px] sm:w-xs lg:w-md h-[58px] sm:h-[72px] lg:h-[84px] rounded-lg flex justify-center items-center">
            <span className="text-center text-foreground text-2xl sm:text-3xl lg:text-4xl">
            Get Started 
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
