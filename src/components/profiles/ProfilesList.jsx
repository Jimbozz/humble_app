import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import Loading from "../common/Loading";
import ProfileCard from "./ProfileCard";

function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  // const getProfiles = useCallback(async () => {
  //   try {
  //     const response = await http.get(
  //       "social/profiles/?_following=true&_followers=true"
  //     );
  //     console.log("hello", response.data);
  //     setProfiles(response.data);
  //   } catch (error) {
  //     setError(error.toString());
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   getProfiles();
  // }, []);

  useEffect(
    () => {
      async function getProfiles() {
        try {
          const response = await http.get(
            "social/profiles/?_following=true&_followers=true"
          );
          console.log("hello", response.data);
          setProfiles(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getProfiles();
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

  return (
    <Container>
      <Row xs={1} className="g-4">
        {profiles.map((profile) => {
          const { name, avatar } = profile;
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

export default ProfilesList;
