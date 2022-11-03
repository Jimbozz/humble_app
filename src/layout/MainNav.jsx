import { Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function MainNav(props) {
  return (
    <aside className="sidebar">
      <div>Brand name</div>
      <div>
        <ul>
          <li>Home</li>
          <li>Profiles</li>
          <li>Profile</li>
        </ul>
        <Dropdown className="d-inline">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            Default Dropdown
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </aside>
  );
}

export default MainNav;
