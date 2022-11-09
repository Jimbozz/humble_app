import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import Loading from "../common/Loading";
import PostCard from "./PostCard";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await http.get(
          "social/posts/?_author=true&_comments=true&_reactions=true"
        );
        console.log("response", response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
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

  return (
    <Container>
      <Row xs={1} className="g-4">
        {posts.map((post) => {
          const { id, title, body, author, created, reactions, comments } =
            post;
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
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
