import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function Heading({ size = "1", content }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1, { replace: true });
  };

  let { id } = useParams();
  const VariableHeading = `h${size}`;

  return (
    <header className="main-content__heading">
      {id ? (
        <Button variant="link" onClick={handleClick}>
          <IoArrowBack />
        </Button>
      ) : null}
      <VariableHeading className="main-content__heading-item">
        {content}
      </VariableHeading>
    </header>
  );
}

Heading.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
};
