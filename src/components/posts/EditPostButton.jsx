import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Dropdown,
  Form,
  Modal,
  Navbar,
  Spinner,
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";
import DeleteButton from "./DeleteButton";

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

export default function EditPostButton({ id }) {
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

  const url = "social/posts/" + id;
  console.log(id);

  useEffect(
    () => {
      async function getData() {
        try {
          const response = await http.get(url);
          console.log("response", response.data);
          setPage(response.data);
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingPage(false);
        }
      }
      getData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdatingPage(true);
    setUpdateError(null);
    setUpdated(false);

    try {
      const response = await http.put(url, data);
      console.log("updated", response.data);
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPage(false);
    }
  }
  if (fetchingPage)
    return (
      <Spinner
        className="loading-icon"
        animation="border"
        role="status"></Spinner>
    );

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
          {/* <Dropdown.Item as="button">Delete post</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {fetchError && <FormError>There was an error loading.</FormError>}
            {updateError && (
              <FormError>There was an error updating your post.</FormError>
            )}
            {updated && (
              <Alert variant="success">Your post has been updated.</Alert>
            )}
            <fieldset disabled={updatingPage}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  defaultValue={page.title}
                  placeholder="post title"
                  aria-describedby="title"
                  {...register("title")}
                />
                {errors.title && (
                  <FormWarning>{errors.title.message}</FormWarning>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  defaultValue={page.body}
                  as="textarea"
                  placeholder="Body text"
                  aria-describedby="body"
                  {...register("body")}
                />
                {errors.body && (
                  <FormWarning>{errors.body.message}</FormWarning>
                )}
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="postTags">
                <Form.Label>Tags (optional)</Form.Label>
                <Form.Control
                  placeholder="Tags"
                  aria-describedby="postTags"
                  {...register("tags")}
                />
                {errors.tags && (
                  <FormWarning>{errors.tags.message}</FormWarning>
                )}
                <Form.Text className="text-muted">
                  Separate tags with a comma.
                </Form.Text>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="media">
                <Form.Label>Media</Form.Label>
                <Form.Control
                  defaultValue={page.media}
                  type="url"
                  placeholder="https://example.com"
                  aria-describedby="media"
                  {...register("media")}
                />
                {errors.media && (
                  <FormWarning>{errors.media.message}</FormWarning>
                )}
              </Form.Group>
              <div className="form-create-button">
                <DeleteButton id={id} />
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </div>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
