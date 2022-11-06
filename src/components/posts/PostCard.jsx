import React, { useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import moment from "moment";
import fallback from "../../assets/humble-logo.png";

export default function PostCard({ title, body, id, author, created }) {
  // const [imageError, setImageError] = useState(false);
  const placeholderImage = fallback;

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholderImage;
  };

  return (
    <Card bg="dark" className="h-100" id={id}>
      <Card.Body>
        <div className="card-profile">
          <div className="card-profile__user">
            {/* <Img
              src={
                author.avatar
                  ? author.avatar
                  : "https://unsplash.com/photos/iulnjpZyWnc"
              }
              alt="Some title"
            /> */}
            <Card.Img
              className="card-profile__user-image"
              src={author.avatar ? author.avatar : placeholderImage}
              alt={author.name}
              onError={onImageError}
            />
            {/* <Card.Img
              className="card-profile__user-image"
              src={author.avatar || "https://unsplash.com/photos/vqTWfa4DjEk"}
              alt={author.name}
              onError={(event) => (event.target.style.display = "none")}
            /> */}
          </div>
          <div className="card-profile__content">
            <Card.Title>{author.name}</Card.Title>
            <div>{moment(created).format("D MMMM YYYY")}</div>
          </div>
        </div>

        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  created: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};
