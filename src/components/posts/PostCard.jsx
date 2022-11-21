import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { format } from "date-fns";
import placeholderImage from "../../assets/profile-placeholder.png";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import OptionsButton from "./OptionsButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { propTypes } from "react-bootstrap/esm/Image";

export default function PostCard({
  title,
  id,
  body,
  created,
  media,
  author,
  reactions,
  comments,
}) {
  const [auth] = useContext(AuthContext);

  const placeholder = placeholderImage;

  const onImageError = (event) => {
    event.target.onerror = null;
    // event.target.src = placeholder;
    event.target.style.display = "none";
  };

  return (
    // <Link to={`post/${id}`} key={id}></Link>
    <Card bg="dark" className="card-width" id={id}>
      <Card.Body>
        <div className="card-profile mb-3">
          <div className="card-profile-top">
            <div className="card-profile-top__user">
              <Card.Img
                className="card-profile-top__user-image"
                src={author.avatar ? author.avatar : placeholder}
                alt={author.name}
                onError={onImageError}
              />
            </div>
            <div className="card-profile-top__content">
              <Link to={`profiles/${author.name}`}>
                <div className="card-profile-top__content--heading">
                  {author.name}
                </div>
              </Link>
              <small className="card-profile-top__content--date">
                {format(new Date(created), "d MMMM Y")}
              </small>
            </div>
          </div>
          {auth.name === author.name ? <OptionsButton /> : null}
        </div>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{body}</Card.Text>
        <Card.Img
          src={media ? media : null}
          onError={(e) => (e.target.style.display = "none")}
        />
        <hr className="card-line"></hr>
        <div className="d-flex gap-3">
          <Button variant="heart" className="d-flex align-items-center">
            <AiOutlineHeart className="btn-heart__icon" />
            <small>{reactions.length}</small>
          </Button>
          <Button variant="comment" className="d-flex align-items-center">
            <BiComment className="btn-comment__icon" />
            <small>{comments.length}</small>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  body: PropTypes.string,
  created: PropTypes.string,
  media: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};
