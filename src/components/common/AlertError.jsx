import PropTypes from "prop-types";
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

AlertError.propTypes = {
  children: PropTypes.string,
};

export default AlertError;
