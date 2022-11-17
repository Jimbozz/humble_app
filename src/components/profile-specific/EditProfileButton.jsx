import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";

export default function EditProfileButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="user-info__edit" variant="dark" onClick={handleShow}>
        <BiEdit className="user-info__edit-icon" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="userBanner">
              <Form.Label>Banner URL (optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                aria-describedby="userBanner"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userAvatar">
              <Form.Label>Avatar URL (optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                aria-describedby="userAvatar"
              />
            </Form.Group>
            <div className="form-create-button">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
