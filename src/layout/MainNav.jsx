import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

function MainNav() {
  let activeStyle = {
    color: "#defe65",
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={require("../assets/humble-logo.png")} alt="humble logo" />
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-content__list">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
            className="sidebar-content__list--item nav-link"
            end>
            <AiFillHome />
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/profiles"
            className="sidebar-content__list--item nav-link"
            end>
            <BsPeopleFill />
            Profiles
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/profile"
            className="sidebar-content__list--item nav-link"
            end>
            <BsFillPersonFill />
            Profile
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/login"
            className="sidebar-content__list--item sidebar-content__list--item-none nav-link">
            <BiLogOut />
            Logout
          </NavLink>
        </ul>
        <Button variant="primary" className=" sidebar-content__button">
          Create post
        </Button>
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

export default MainNav;
