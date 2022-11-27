import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";

export default function FollowButton({ name, getProfile }) {
  const http = useAxios();
  const followUrl = "social/profiles/" + name + "/follow";
  const unFollowUrl = "social/profiles/" + name + "/unfollow";

  const [following, setFollowing] = useState(false);

  const followUser = async () => {
    try {
      const response = await http.put(followUrl);
      console.log("response", response.data);
      setFollowing(true);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      const response = await http.put(unFollowUrl);
      console.log("response", response.data);
      setFollowing(false);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   unFollowUser();
  // });

  return (
    <>
      {/* {following ? (
        <Button onClick={unFollowUser} variant="outline-danger">
          Un-follow
        </Button>
      ) : (
        <Button onClick={followUser} variant="primary">
          Follow
        </Button>
      )} */}
      {/* <Button onClick={unFollowUser} variant="danger">
        Un-follow
      </Button>

      <Button onClick={followUser} variant="primary">
        Follow
      </Button> */}
      <Button onClick={unFollowUser} variant="danger" disabled={!following}>
        Un-follow
      </Button>

      <Button onClick={followUser} variant="primary" disabled={following}>
        Follow
      </Button>
    </>
  );
}
