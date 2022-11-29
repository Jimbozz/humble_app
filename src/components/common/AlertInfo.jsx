import PropTypes from "prop-types";
import { Alert, Container } from "react-bootstrap";

function AlertInfo({ children }) {
  return <Alert variant="info">{children}</Alert>;
}

AlertInfo.propTypes = {
  children: PropTypes.string,
};

export default AlertInfo;
