import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default function FormWarning({ children }) {
  return <small className="form-warning">{children}</small>;
}

FormWarning.propTypes = {
  children: PropTypes.node.isRequired,
};
