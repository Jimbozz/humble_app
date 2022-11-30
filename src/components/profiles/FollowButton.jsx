import Button from "react-bootstrap/Button";
import useAxios from "../../hooks/useAxios";

export default function FollowButton({ name, getProfile }) {
  const http = useAxios();
  const followUrl = "social/profiles/" + name + "/follow";
  const unFollowUrl = "social/profiles/" + name + "/unfollow";

  const followUser = async () => {
    try {
      await http.put(followUrl);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      await http.put(unFollowUrl);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

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
