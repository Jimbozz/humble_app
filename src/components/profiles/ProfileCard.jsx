import React from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import fallback from "../../assets/profile-placeholder.png";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function ProfileCard({ name, avatar, getProfile }) {
  const placeholderImage = fallback;

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholderImage;
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
          <Link to={`${name}`}>
            <Card.Title className="profile-card__content-name">
              {name}
            </Card.Title>
          </Link>
        </div>
        <FollowButton name={name} getProfile={getProfile} />
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};
