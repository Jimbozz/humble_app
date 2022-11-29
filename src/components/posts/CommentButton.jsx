import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BiComment } from "react-icons/bi";
import useAxios from "../../hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";
import CommentModalPost from "./CommentModalPost";

const schema = yup.object().shape({
  body: yup
    .string()
    .required("You must add a comment.")
    .min(1, "Comment should be at least 1 character"),
});

export default function CommentButton({
  comments,
  id,
  title,
  body,
  author,
  created,
  media,
  getPosts,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const http = useAxios();
  const url = "social/posts/" + id + "/comment";

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
    setUpdated(false);
    console.log(data);

    try {
      await http.post(url, data);
      setUpdated(true);
      getPosts();
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
        variant="comment"
        className="d-flex align-items-center"
        onClick={handleShow}>
        <BiComment className="btn-comment__icon" />
        <small>{comments.length}</small>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Comment</Modal.Title>
        </Modal.Header>
        <CommentModalPost
          key={id}
          id={id}
          title={title}
          body={body}
          author={author}
          created={created}
          media={media}
        />
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}
            {updated && (
              <Alert variant="success">Your comment was successful.</Alert>
            )}
            <fieldset disabled={submitting}>
              <Form.Group className="mb-3" controlId="commentBody">
                <Form.Control
                  as="textarea"
                  placeholder="Comment on post"
                  aria-describedby="commentBody"
                  {...register("body")}
                />
                {errors.body && (
                  <FormWarning>{errors.body.message}</FormWarning>
                )}
              </Form.Group>
              <div className="form-create-button">
                <Button variant="primary" type="submit">
                  {submitting ? "Commenting..." : "Comment"}
                </Button>
              </div>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
