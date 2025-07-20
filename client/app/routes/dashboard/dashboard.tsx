import { useNavigate , redirect } from "react-router";
import {apiUrl} from "../../config/api";

export default function dashboard () {
  const navigate = useNavigate();
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
    <div className="bg-white">
      Dashboard
      <div>
        <button onClick={handleLogout} >
          LogOut
        </button>
      </div>
    </div>
  )
}