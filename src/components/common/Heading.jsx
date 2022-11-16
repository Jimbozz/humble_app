import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function Heading({ size = "1", content }) {
  let { id } = useParams();
  const VariableHeading = `h${size}`;

  return (
    <header className="main-content__heading">
      {id ? <div>Button</div> : null}
      <VariableHeading>{content}</VariableHeading>
    </header>
  );
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};
