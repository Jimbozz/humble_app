import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Loading from "../common/Loading";
import AlertError from "../common/AlertError";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Posts from "./PostsList";
import ProfileCard from "../profiles/ProfileCard";
import AlertInfo from "../common/AlertInfo";
import placeholderImage from "../../assets/profile-placeholder.png";
import EditProfileButton from "./EditProfileButton";
import AuthContext from "../../context/AuthContext";
import { useCallback } from "react";
import FollowButton from "../profiles/FollowButton";

export default function ProfileSpecific() {
  const [auth] = useContext(AuthContext);
  const placeholder = placeholderImage;
  const placeholderBanner =
    "https://images.unsplash.com/photo-1552688468-d87e6f7a58f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholder;
  };

  const onImageErrorBanner = (event) => {
    event.target.onerror = null;
    event.target.src = placeholderBanner;
  };

  let { id } = useParams();
  const url = "social/profiles/" + id + "?_following=true&_followers=true";
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  const getProfile = useCallback(
    async () => {
      try {
        const response = await http.get(url);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      getProfile();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
            src={profile.banner ? profile.banner : placeholderBanner}
            alt={profile.name}
            onError={onImageErrorBanner}
          />
        </div>
        {auth.name === profile.name ? (
          <EditProfileButton getProfile={getProfile} />
        ) : null}
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
      <div className="d-flex justify-content-center mb-3 user-follow">
        {auth.name !== profile.name ? (
          <FollowButton name={profile.name} getProfile={getProfile} />
        ) : null}
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
                    <ProfileCard avatar={avatar} name={name} />
                  </Col>
                );
              })
            ) : (
              <Col>
                <AlertInfo>This user has no followers</AlertInfo>
              </Col>
            )}
          </Row>
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
