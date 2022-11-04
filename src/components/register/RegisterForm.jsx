import { Button, Col, Form, Row } from "react-bootstrap";

function RegisterForm() {
  return (
    <Form className="form-layout">
      <h1 className="form-layout__heading">Register</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName" sm={6}>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Enter name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail" sm={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAvatar">
        <Form.Label>Avatar image URL</Form.Label>
        <Form.Control type="url" placeholder="https://example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBanner">
        <Form.Label>Banner image URL</Form.Label>
        <Form.Control type="url" placeholder="https://example.com" />
      </Form.Group>
      <div className="form-layout__button">
        <Button variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
