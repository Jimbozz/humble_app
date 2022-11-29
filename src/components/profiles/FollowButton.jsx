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

      getProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setFollowing(true);
    }
  };

  const unFollowUser = async () => {
    try {
      const response = await http.put(unFollowUrl);
      console.log("response", response.data);

      getProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setFollowing(false);
    }
  };

  // useEffect(() => {
  //   unFollowUser();
  // });

  return (
    <>
      <Button onClick={unFollowUser} variant="danger">
        Un-follow
      </Button>
      <Button onClick={followUser} variant="primary">
        Follow
      </Button>
    </>
  );
}
