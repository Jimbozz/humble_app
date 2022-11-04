import { Card } from "react-bootstrap";
import Heading from "../../layout/Heading";

function ProfilesPage() {
  return (
    <>
      <Heading content="Profiles Page" />
      <Card bg="dark">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfilesPage;
