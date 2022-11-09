import React from "react";
import { Alert, Container } from "react-bootstrap";

export function AlertInfo({ children }) {
  return (
    <Container>
      <Alert variant="info">{children}</Alert>
    </Container>
  );
}
