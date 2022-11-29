import PropTypes from "prop-types";

export default function FormWarning({ children }) {
  return <small className="form-warning">{children}</small>;
}

FormWarning.propTypes = {
  children: PropTypes.node.isRequired,
};
