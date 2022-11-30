import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsFillPersonFill } from "react-icons/bs";
import CreatePostButton from "./CreatePost";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LogoutButton from "../components/common/LogoutButton";

export default function MainNav() {
  const [auth] = useContext(AuthContext);

  const userName = auth.name;
  let activeStyle = {
    color: "#defe65",
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          className="sidebar-logo__image"
          src={require("../assets/humble-logo.png")}
          alt="humble logo"
        />
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content__list">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
            className="sidebar-content__list--item nav-link"
            end>
            <AiFillHome />
            <span className="sidebar-content__list--name">Home</span>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/profiles"
            className="sidebar-content__list--item nav-link"
            end>
            <BsPeopleFill />
            <span className="sidebar-content__list--name">Profiles</span>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={`/my-profile/${userName}`}
            className="sidebar-content__list--item nav-link"
            end>
            <BsFillPersonFill />
            <span className="sidebar-content__list--name">Profile</span>
          </NavLink>
          <LogoutButton />
        </div>
        <CreatePostButton />
      </div>
    </aside>
  );
}
