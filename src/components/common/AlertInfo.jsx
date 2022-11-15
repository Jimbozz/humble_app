import React from "react";
import { Alert, Container } from "react-bootstrap";

export function AlertInfo({ children }) {
  return <Alert variant="info">{children}</Alert>;
}
