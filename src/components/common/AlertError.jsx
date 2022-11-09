import React from "react";
import { Alert, Container } from "react-bootstrap";

function AlertError({ children }) {
  return (
    <Container>
      <Alert key="danger" variant="danger">
        {children}
      </Alert>
    </Container>
  );
}

export default AlertError;
