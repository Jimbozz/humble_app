import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

function AlertInfo({ children }) {
  return <Alert variant="info">{children}</Alert>;
}

AlertInfo.propTypes = {
  children: PropTypes.string,
};

export default AlertInfo;
