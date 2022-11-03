import React from "react";
import { Card } from "react-bootstrap";

function ProfileCard() {
  return (
    <aside className="profile-card-container">
      <Card bg="dark">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Name of user</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </aside>
  );
}

export default ProfileCard;
