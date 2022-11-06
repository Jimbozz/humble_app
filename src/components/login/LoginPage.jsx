import { Button, Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleButtonClick(path) {
    navigate(path);
  }

  return (
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
          <Button variant="link" onClick={() => handleButtonClick("/register")}>
            Register here
          </Button>
        </div>
      </div>
    </Container>
  );
}
