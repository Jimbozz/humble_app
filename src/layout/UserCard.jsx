import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

export default function UserCard() {
  //Get user name from local storage
  const userProfile = useContext(AuthContext);
  const profile = userProfile[0];
  const userName = profile.name;

  //Get data from the specific user

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const http = useAxios();
  const url = "social/profiles/" + userName;

  useEffect(() => {
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
  }, []);

  if (error) {
    return <div>Error: An error occurred here</div>;
  }

  return (
    <aside className="user-card-container">
      <Card bg="dark">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body className="d-flex align-items-center flex-column user-body">
          <div className="user-body__image-banner"></div>
          <div className="user-body__image-avatar"></div>
          {/* <Card.Img src="holder.js/100px180" /> */}
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
