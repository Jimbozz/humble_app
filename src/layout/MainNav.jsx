import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import CreatePostButton from "./CreatePost";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function MainNav() {
  const [auth] = useContext(AuthContext);

  const userName = auth.name;
  let activeStyle = {
    color: "#defe65",
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={require("../assets/humble-logo.png")} alt="humble logo" />
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
            to={`profiles/${userName}`}
            className="sidebar-content__list--item nav-link"
            end>
            <BsFillPersonFill />
            <span className="sidebar-content__list--name">Profile</span>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/login"
            className="sidebar-content__list--item sidebar-content__list--item-none nav-link">
            <BiLogOut />
          </NavLink>
        </div>
        <CreatePostButton />
        <hr className="sidebar-content__line"></hr>
        <ButtonGroup justified="true" className="sidebar-content__dropdown">
          <DropdownButton
            variant="dark"
            id="dropdown-basic-button"
            title="User name"
            menuVariant="dark">
            <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    </aside>
  );
}
