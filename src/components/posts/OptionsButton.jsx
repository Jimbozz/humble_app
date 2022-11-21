import React, { useState } from "react";
import { Button, Dropdown, Modal, Navbar } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Must be a minimum of 2 characters")
    .min(2, "Title should be at least 2 characters"),
  body: yup.string(),
  // tags: yup.array(),
  media: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted."),
});

export default function OptionsButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [page, setPage] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPage, setFetchingPage] = useState(true);
  const [updatingPage, setUpdatingPage] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { id } = useParams();
  const url = `social/posts/${id}`;
  console.log(id);

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
