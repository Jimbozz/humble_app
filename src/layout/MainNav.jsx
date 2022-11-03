import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function MainNav(props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={require("../assets/humble-logo.png")} alt="humble logo" />
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-content_list">
          <li>Home</li>
          <li>Profiles</li>
          <li>Profile</li>
          <Button variant="primary" className="w-100">
            Create post
          </Button>
        </ul>
        <hr></hr>
        <ButtonGroup justified>
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
