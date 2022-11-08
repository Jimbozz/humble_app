import React, { useState } from "react";
import { Button, Dropdown, Modal, Navbar } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";

function OptionsButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="options" id="dropdown-basic">
          <BsThreeDots />
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item as="button" onClick={handleShow}>
            Edit post
          </Dropdown.Item>
          <Dropdown.Item as="button">Delete post</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OptionsButton;
