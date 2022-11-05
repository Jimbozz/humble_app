import { Button, Container } from "react-bootstrap";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
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
        <RegisterForm />
        <div>
          <small>Already have an account ?</small>
          <Button variant="link" onClick={() => handleButtonClick("/login")}>
            Login here
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
