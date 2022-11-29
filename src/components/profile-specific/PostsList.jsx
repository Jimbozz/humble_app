import React, { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import AlertInfo from "../common/AlertInfo";
import Loading from "../common/Loading";
import PostCard from "../posts/PostCard";

function Posts() {
  let { id } = useParams();
  const url =
    "social/profiles/" +
    id +
    "/posts/?_author=true&_comments=true&_reactions=true";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  const getPosts = useCallback(
    async () => {
      try {
        const response = await http.get(url);
        setPosts(response.data);
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
      getPosts();
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

  if (posts.length === 0) {
    return <AlertInfo>This user has not created any posts yet.</AlertInfo>;
  }

  return (
    <Row xs={1} className="g-4 mb-5">
      {posts.map((post) => {
        const {
          id,
          title,
          body,
          author,
          created,
          reactions,
          comments,
          media,
          tags,
        } = post;
        return (
          <Col key={id}>
            <PostCard
              key={id}
              id={id}
              title={title}
              body={body}
              author={author}
              created={created}
              reactions={reactions}
              comments={comments}
              media={media}
              tags={tags}
              getPosts={getPosts}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Posts;
