import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import fallback from "../../assets/profile-placeholder.png";
import { Link } from "react-router-dom";

export default function ProfileCard({ name, avatar }) {
  const placeholderImage = fallback;

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholderImage;
  };

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload(true);
    });
  };

  return (
    <Card bg="dark" id={name} className="profile-card card-width">
      <Card.Body className="d-flex align-items-center justify-content-between gap-3">
        <div className="profile-card__content">
          <div className="profile-card__content-image">
            <Card.Img
              className="profile-card__content-image-content"
              variant="top"
              src={avatar ? avatar : placeholderImage}
              alt={name}
              onError={onImageError}
            />
          </div>
          <Link to={`/profiles/${name}`} onClick={reloadPage}>
            <Card.Title className="profile-card__content-name">
              {name}
            </Card.Title>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};
