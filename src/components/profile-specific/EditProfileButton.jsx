import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  banner: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted."),
  avatar: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted."),
});

export default function EditProfileButton({ getProfile }) {
  const { id } = useParams();
  const url = "social/profiles/" + id + "/media";
  const userUrl = "social/profiles/" + id;
  const http = useAxios();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [updateData, setUpdateData] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(
    () => {
      async function getData() {
        try {
          const response = await http.get(userUrl);
          console.log(response.data);
          setFormData(response.data);
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingData(false);
        }
      }
      getData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdateData(true);
    setUpdateError(null);
    setUpdated(false);

    try {
      const response = await http.put(url, data);
      console.log(response.data);
      setUpdated(true);
      getProfile();
      // setShow(false);
    } catch (error) {
      console.log(error);
      setUpdateError(error.toString());
    } finally {
      setUpdateData(false);
    }
  }

  if (fetchingData)
    return (
      <Spinner
        className="loading-icon"
        animation="border"
        role="status"></Spinner>
    );

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
            {fetchError && (
              <FormError>There was an error updating your profile.</FormError>
            )}
            {updated && (
              <Alert variant="success">Your profile has been updated.</Alert>
            )}
            {updateError && <FormError>{updateError}</FormError>}
            <fieldset disabled={updateData}>
              <Form.Group className="mb-3" controlId="userBanner">
                <Form.Label>Banner URL (optional)</Form.Label>
                <Form.Control
                  type="url"
                  defaultValue={formData.banner}
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
                  defaultValue={formData.avatar}
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
                  {updateData ? "updating profile" : "Update"}
                </Button>
              </div>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
