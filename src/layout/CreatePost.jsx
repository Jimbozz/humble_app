import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import FormWarning from "../components/common/FormWarning";
import FormError from "../components/common/FormError";

const url = "social/posts";
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

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const http = useAxios();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setCreateError(null);
    console.log(data);
    try {
      const response = await http.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setCreateError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}
            <fieldset disabled={submitting}>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Post title</Form.Label>
                <Form.Control
                  placeholder="Post title"
                  aria-describedby="postTitle"
                  {...register("title")}
                />
                {errors.title && (
                  <FormWarning>{errors.title.message}</FormWarning>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="postBody">
                <Form.Label>Body (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Body text"
                  aria-describedby="postBody"
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

              <Form.Group className="mb-3" controlId="postMedia">
                <Form.Label>Image URL (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com"
                  aria-describedby="postMedia"
                  {...register("media")}
                />
                {errors.media && (
                  <FormWarning>{errors.media.message}</FormWarning>
                )}
              </Form.Group>
              <div className="form-create-button">
                <Button variant="primary" type="submit">
                  {submitting ? "Creating post" : "Create"}
                </Button>
              </div>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
