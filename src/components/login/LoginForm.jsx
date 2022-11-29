import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";

const loginUrl = BASE_URL + "social/auth/login";
const regex = new RegExp("[a-z0-9]+@stud.noroff.no");

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter a valid Noroff student email.")
    .matches(regex, "Does not seem to be a valid Noroff email address."),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .min(8, "Password should be a minimum of 8 characters."),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [, setAuth] = useContext(AuthContext);
  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(loginUrl, data);
      console.log("response", response.data);

      setAuth(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoginError(
        "There seems to be a technical error. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-layout__heading">Login</h1>
      {loginError && <FormError>{loginError}</FormError>}
      <fieldset disabled={submitting}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Eg: first.last@stud.noroff.no"
            aria-describedby="userEmail"
            {...register("email")}
          />
          {errors.email && <FormWarning>{errors.email.message}</FormWarning>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            aria-describedby="userPassword"
            {...register("password")}
          />
          {errors.password && (
            <FormWarning>{errors.password.message}</FormWarning>
          )}
        </Form.Group>
        <div className="form-layout__button">
          <Button variant="primary" type="submit">
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}
