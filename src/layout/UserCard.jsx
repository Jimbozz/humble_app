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
        const userInfo = response.data;
        setUser(userInfo);
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
    <aside className="profile-card-container">
      <Card bg="dark">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <div className="d-flex">
            <div>
              <div>{user._count?.posts}</div>
              <div>Posts</div>
            </div>
            <div>
              <div>{user._count?.followers}</div>
              <div>Followers</div>
            </div>
            <div>
              <div>{user._count?.following}</div>
              <div>Following</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </aside>
  );
}
