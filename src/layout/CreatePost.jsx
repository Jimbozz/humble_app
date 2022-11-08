import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function CreatePost() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className=" sidebar-content__button"
        onClick={handleShow}>
        Create post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                placeholder="Post title"
                aria-describedby="postTitle"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postTags">
              <Form.Label>Tags (optional)</Form.Label>
              <Form.Control placeholder="Tags" aria-describedby="postTags" />
              <Form.Text className="text-muted">
                Separate tags with a comma.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postBody">
              <Form.Label>Body (optional)</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Body text"
                aria-describedby="postBody"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postImage">
              <Form.Label>Image URL (optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                aria-describedby="postImage"
              />
            </Form.Group>
            <div className="form-create-button">
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
