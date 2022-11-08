import React from "react";
import { Button, Dropdown, Navbar } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function OptionsButton() {
  return (
    // <Button variant="options">
    //   <BsThreeDots />
    // </Button>
    <Dropdown>
      <Dropdown.Toggle variant="options" id="dropdown-basic">
        <BsThreeDots />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <NavLink to="/link_to_somewhere">
          <div className="dropdown-item">Edit post</div>
        </NavLink>
        <NavLink to="/link_to_somewhere">
          <div className="dropdown-item">Delete post</div>
        </NavLink>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OptionsButton;
