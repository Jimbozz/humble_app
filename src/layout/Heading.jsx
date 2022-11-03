import PropTypes from "prop-types";

function Heading({ size = "1", content }) {
  const VariableHeading = `h${size}`;

  return (
    <header className="heading-container">
      <VariableHeading>{content}</VariableHeading>
    </header>
  );
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Heading;
