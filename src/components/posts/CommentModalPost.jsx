import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/profile-placeholder.png";

export default function CommentModalPost({
  title,
  id,
  body,
  created,
  media,
  author,
}) {
  const placeholder = placeholderImage;

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.style.display = "none";
  };
  return (
    <Card bg="dark" className="comment-modal">
      <Card.Body>
        <div className="card-profile-top mb-3">
          <div className="card-profile-top__user">
            <Card.Img
              className="card-profile-top__user-image"
              src={author.avatar ? author.avatar : placeholder}
              alt={author.name}
              onError={onImageError}
            />
          </div>
          <div className="card-profile-top__content">
            <Link className="card-link" to={`/profiles/${author.name}`}>
              <div className="card-profile-top__content--heading">
                {author.name}
              </div>
            </Link>
            <small className="card-profile-top__content--date">
              {format(new Date(created), "d MMMM Y")}
            </small>
          </div>
        </div>
        <Link className="card-link" to={`/post/${id}/${title}`} key={id}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
          <Card.Img
            src={media ? media : null}
            onError={(e) => (e.target.style.display = "none")}
          />
        </Link>
        <hr className="card-line"></hr>
      </Card.Body>
    </Card>
  );
}
