import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

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
