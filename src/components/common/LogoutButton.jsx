import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function LogoutButton({ activeStyle }) {
  const [, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }
  return (
    <NavLink
      onClick={logoutUser}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      to="/login"
      className="sidebar-content__list--item sidebar-content__list--item-none nav-link">
      <BiLogOut />
      <span className="sidebar-content__list--name">Logout</span>
    </NavLink>
  );
}
