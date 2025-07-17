import { NavLink } from "react-router";
export default function dashboard () {
  return(
    <div className="bg-white">
      Dashboard
      <div>
        <NavLink to="/" >
          LogOut
        </NavLink>
      </div>
    </div>
  )
}