import { useNavigate , redirect } from "react-router";
import {apiUrl} from "../../config/api";
import { useState, useEffect } from "react";

export default function Home () {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user data");
      const response = await fetch(`${apiUrl}/user/profile`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Failed to fetch user data");
        navigate("/login");
      }
      const data = await response.json();
      setName(data.username);
    };
    fetchUser();
  });
  async function handleLogout() {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ name, password }),
    });
    navigate("/");
    // Logic to handle logout, e.g., clearing tokens, etc.
    console.log("User logged out");
  }
  return(
    <div className="bg-background flex flex-col items-center min-h-screen">
      <h1></h1>
      <div>
        <span className="text-2xl text-foreground font-Inter">
          {name ? `Hey there, ${name}!` : "Loading..."}
        </span>
      </div>
      <div>
        <button className="bg-primary hover:bg-primary-hover border-1 w-3xs h-[50px] rounded-2xl flex justify-center items-center" onClick={handleLogout} >
          <span className="font-Inter text-center text-lg">
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}