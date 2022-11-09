import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import useAxios from "../../hooks/useAxios";
import Loading from "../common/Loading";
import AlertError from "../common/AlertError";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Posts from "./PostsList";
import ProfileCard from "../profiles/ProfileCard";
import { AlertInfo } from "../common/AlertInfo";
import FollowersList from "./FollowersList";

function ProfileSpecific() {
  let { id } = useParams();
  const url = "social/profiles/" + id + "?_following=true&_followers=true";
  const [profile, setProfile] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(url);
        console.log(response.data);
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
      <Row className="justify-content-md-center mb-3">
        <Col sm={2}>Followers {profile.followers.length}</Col>
        <Col sm={2}>Following {profile.following.length}</Col>
      </Row>
      <Tabs
        defaultActiveKey="posts"
        id="justify-tab-example"
        className="mb-3"
        justify>
        <Tab eventKey="posts" title="Posts" className="tab-link">
          <Posts />
        </Tab>
        <Tab eventKey="followers" title="Followers">
          {/* {profile.followers.map((item) => {
              const { name, avatar } = item;
              return (
                <Col key={name}>
                  <ProfileCard name={name} avatar={avatar} />
                </Col>
              );
            })} */}
          <FollowersList />
        </Tab>
        <Tab eventKey="following" title="Following">
          <Row xs={1} className="g-4">
            {/*Check to see if you can check for length and add an alert instead of calling for more data. */}
            {/* {profile.following.map((item) => {
              const { name, avatar } = item;
              return (
                <Col key={name}>
                  <ProfileCard name={name} avatar={avatar} />
                </Col>
              );
            })} */}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ProfileSpecific;
