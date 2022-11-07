import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
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
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: An error occurred here</div>;
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
