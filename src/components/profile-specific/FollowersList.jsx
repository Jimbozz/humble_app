import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import { AlertInfo } from "../common/AlertInfo";
import Loading from "../common/Loading";
import ProfileCard from "../profiles/ProfileCard";

function FollowersList() {
  let { id } = useParams();
  const url = "social/profiles/" + id + "?_following=true&_followers=true";
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function getFollowers() {
      try {
        const response = await http.get(url);
        console.log(response.data);
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getFollowers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <AlertError>
        There was an error loading posts. Please reload the page or try again
        later.
      </AlertError>
    );
  }

  if (followers.followers.length === 0) {
    return <AlertInfo>This profile has no followers</AlertInfo>;
  }

  return (
    <Container>
      <Row xs={1} className="g-4">
        {followers.followers.map((follower) => {
          const { name, avatar } = follower;
          return (
            <Col key={name}>
              <ProfileCard key={name} name={name} avatar={avatar} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default FollowersList;
