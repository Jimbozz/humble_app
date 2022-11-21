import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";

const schema = yup.object().shape({
  banner: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted."),
  avatar: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted."),
});

export default function EditProfileButton() {
  const [auth] = useContext(AuthContext);
  const userName = auth.name;
  const url = "social/profiles/" + userName + "/media";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(false);
  const http = useAxios();

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
      const response = await http.put(url, data);
      console.log(response.data);
      setShow(false);
    } catch (error) {
      console.log(error);
      setCreateError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}
            <fieldset disabled={submitting}>
              <Form.Group className="mb-3" controlId="userBanner">
                <Form.Label>Banner URL (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com"
                  aria-describedby="userBanner"
                  {...register("banner")}
                />
                {errors.banner && (
                  <FormWarning>{errors.banner.message}</FormWarning>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="userAvatar">
                <Form.Label>Avatar URL (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com"
                  aria-describedby="userAvatar"
                  {...register("avatar")}
                />
                {errors.avatar && (
                  <FormWarning>{errors.avatar.message}</FormWarning>
                )}
              </Form.Group>
              <div className="form-create-button">
                <Button variant="primary" type="submit">
                  {submitting ? "updating profile" : "Update"}
                </Button>
              </div>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
