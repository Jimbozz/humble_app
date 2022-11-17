import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../common/Heading";
import Layout from "../../layout/Layout";
import useAxios from "../../hooks/useAxios";
import Loading from "../common/Loading";
import AlertError from "../common/AlertError";
import { Button, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import Posts from "./PostsList";
import ProfileCard from "../profiles/ProfileCard";
import { AlertInfo } from "../common/AlertInfo";
import FollowersList from "./FollowersList";
import placeholderImage from "../../assets/profile-placeholder.png";
import EditProfileButton from "./EditProfileButton";

export default function ProfileSpecific() {
  const placeholder = placeholderImage;
  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholder;
  };

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
        console.log("response", response.data);
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

  const hasFollowers = profile.followers.length;
  const isFollowing = profile.following.length;

  return (
    <Container>
      <div className="user-info">
        <div className="user-info__banner">
          <Image
            className="user-info__banner-image"
            src={profile.banner ? profile.banner : placeholder}
            alt={profile.name}
            onError={onImageError}
          />
        </div>
        <EditProfileButton />
        <div className="user-info__avatar">
          <Image
            className="user-info__avatar-image"
            src={profile.avatar ? profile.avatar : placeholder}
            alt={profile.name}
            onError={onImageError}
          />
        </div>
        <div className="user-info__email">{profile.email}</div>
      </div>
      <div className="d-flex justify-content-center mb-3 user-follow">
        <Col md="auto" className="d-flex align-items-center">
          <span className="user-follow__number">
            {profile.followers.length}
          </span>{" "}
          Followers
        </Col>
        <Col md="auto" className="d-flex align-items-center">
          <span className="user-follow__number">
            {profile.following.length}
          </span>
          Following
        </Col>
      </div>
      <Tabs
        defaultActiveKey="posts"
        id="justify-tab-example"
        className="mb-3 tab-container"
        justify>
        <Tab eventKey="posts" title="Posts" className="tab-container__link">
          <Posts />
        </Tab>
        <Tab eventKey="followers" title="Followers" className="tab.link">
          <Row xs={1} className="g-4 mb-5">
            {hasFollowers ? (
              profile.followers.map((item) => {
                const { name, avatar } = item;
                return (
                  <Col key={name}>
                    <ProfileCard name={name} avatar={avatar} />
                  </Col>
                );
              })
            ) : (
              <Col>
                <AlertInfo>This user has no followers</AlertInfo>
              </Col>
            )}
          </Row>
          {/* <FollowersList /> */}
        </Tab>
        <Tab eventKey="following" title="Following">
          <Row xs={1} className="g-4 mb-5">
            {isFollowing ? (
              profile.following.map((item) => {
                const { name, avatar } = item;
                return (
                  <Col key={name}>
                    <ProfileCard name={name} avatar={avatar} />
                  </Col>
                );
              })
            ) : (
              <Col>
                <AlertInfo>This user is not following anyone.</AlertInfo>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}
