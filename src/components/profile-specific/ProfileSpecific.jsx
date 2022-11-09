import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import useAxios from "../../hooks/useAxios";
import Loading from "../common/Loading";
import AlertError from "../common/AlertError";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

function ProfileSpecific() {
  let { id } = useParams();
  console.log(id);
  const url = "social/profiles/" + id + "?_following=true&_followers=true";

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(url);
        console.log("profile", response.data);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <AlertError>
        There was an error. Please reload the page or try again later
      </AlertError>
    );
  }

  return (
    <Container>
      <div className="user-info">
        <div className="user-info__banner">Banner</div>
        <div className="user-info__avatar">Avatar</div>
        <div className="user-info__email">{profile.email}</div>
      </div>
      <Row className="justify-content-md-center">
        <Col xs={3}>Followers {profile.followers.length}</Col>
        <Col xs={3}>Following {profile.following.length}</Col>
      </Row>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify>
        <Tab eventKey="home" title="Home">
          Some content goes here 234234
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Other content goes here 234234
        </Tab>
        <Tab eventKey="longer-tab" title="Loooonger Tab">
          Some Some content goes here 234234
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ProfileSpecific;
