import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import placeholderImage from "../assets/profile-placeholder.png";
import AlertError from "../components/common/AlertError";

export default function UserCard() {
  const placeholder = placeholderImage;
  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholder;
  };

  //Get user name from local storage
  const userProfile = useContext(AuthContext);
  const profile = userProfile[0];
  const userName = profile.name;

  //Get data from the specific user

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const http = useAxios();
  const url = "social/profiles/" + userName;

  useEffect(
    () => {
      async function getUser() {
        try {
          const response = await http.get(url);
          console.log("response", response.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
          setError(error.toString());
        }
      }
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (error) {
    return (
      <AlertError>
        There was an error. Please reload the page or try again later
      </AlertError>
    );
  }

  return (
    <aside className="user-card-container">
      <Card bg="dark">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body className="d-flex align-items-center flex-column user-body">
          <div className="user-body__banner">
            <Card.Img
              className="user-body__banner-item"
              src={user.banner ? user.banner : placeholder}
              alt={user.name}
              onError={onImageError}
            />
          </div>
          <div className="user-body__avatar">
            <Card.Img
              className="user-body__avatar-item"
              src={user.avatar ? user.avatar : placeholder}
              alt={user.name}
              onError={onImageError}
            />
          </div>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text className="user-body__email">{user.email}</Card.Text>
          <div className="d-flex gap-3 card-body__data">
            <div className="d-flex flex-column align-items-center user-body__data-item">
              <div className="user-body__data-item_number">
                {user._count?.posts}
              </div>
              <small>Posts</small>
            </div>
            <div className="d-flex flex-column align-items-center user-body__data-item">
              <div className="user-body__data-item_number">
                {user._count?.followers}
              </div>
              <small>Followers</small>
            </div>
            <div className="d-flex flex-column align-items-center user-body__data-item">
              <div className="user-body__data-item_number">
                {user._count?.following}
              </div>
              <small>Following</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </aside>
  );
}
