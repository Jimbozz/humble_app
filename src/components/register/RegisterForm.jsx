import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import FormError from "../common/FormError";
import FormWarning from "../common/FormWarning";

const registerUrl = BASE_URL + "social/auth/register";
const regex = new RegExp("[a-z0-9]+@stud.noroff.no");

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Use an _underscore to separate name, no periods(.).")
    .min(3, "Username should be at least 3 characters"),
  email: yup
    .string()
    .required("Please enter a valid Noroff student email.")
    .matches(regex, "Does not seem to be a valid Noroff email address."),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .min(8, "Password should be a minimum of 8 characters."),
  avatar: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted.")
    .nullable(),
  banner: yup
    .string()
    .url("Not a valid URL, make sure image is publicly hosted.")
    .nullable(),
});

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);

    console.log(data);

    try {
      const response = await axios.post(registerUrl, data);
      console.log("response", response.data);
      //Look to see if we can tell if user is already in database!
      navigate("/login");
      // if (response.ok) {
      //   navigate("/login");
      // } else {
      //   setRegisterError(
      //     "Unable to register, please make sure credentials are correct otherwise contact support."
      //   );
      // }
    } catch (error) {
      console.log(error);
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-layout__heading">Register</h1>
      {registerError && <FormError>{registerError}</FormError>}
      <fieldset disabled={submitting}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="username" sm={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter username"
              aria-describedby="username"
              {...register("name")}
            />
            {errors.name && <FormWarning>{errors.name.message}</FormWarning>}
          </Form.Group>

          <Form.Group as={Col} controlId="userEmail" sm={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              aria-describedby="userEmail"
              {...register("email")}
            />
            {errors.email && <FormWarning>{errors.email.message}</FormWarning>}
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            aria-describedby="userPassword"
            {...register("password")}
          />
          {errors.email && <FormWarning>{errors.password.message}</FormWarning>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="userAvatar">
          <Form.Label>Avatar image URL (optional)</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com"
            aria-describedby="userAvatar"
            {...register("avatar")}
          />
          {errors.avatar && <FormWarning>{errors.avatar.message}</FormWarning>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="userBanner">
          <Form.Label>Banner image URL (optional)</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com"
            aria-describedby="userBanner"
            {...register("banner")}
          />
          {errors.banner && <FormWarning>{errors.banner.message}</FormWarning>}
        </Form.Group>
        <div className="form-layout__button">
          <Button variant="primary" type="submit">
            {submitting ? "Creating profile" : "Register"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}
