import PropTypes from "prop-types";

function Heading({ size = "1", content }) {
  const VariableHeading = `h${size}`;

  return <VariableHeading>{content}</VariableHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Heading;
