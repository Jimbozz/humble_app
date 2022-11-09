import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default function FormError({ children }) {
  return <Alert variant="danger">{children}</Alert>;
}

FormError.propTypes = {
  children: PropTypes.node.isRequired,
};
