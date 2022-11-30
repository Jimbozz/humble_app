import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleButtonClick(path) {
    navigate(path);
  }

  return (
    <>
      <Helmet>
        <title>Humble | Login</title>
      </Helmet>
      <Container className="form-wrapper d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="form-logo">
            <img
              className="form-logo__image"
              src={require("../../assets/humble-logo.png")}
              alt="humble logo"
            />
          </div>
          <LoginForm />
          <div>
            <small>Need to register a new account?</small>
            <Button
              variant="link"
              onClick={() => handleButtonClick("/register")}>
              Register here
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
