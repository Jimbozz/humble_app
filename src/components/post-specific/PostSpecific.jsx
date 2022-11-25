import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import { AlertInfo } from "../common/AlertInfo";
import Loading from "../common/Loading";
import PostCard from "../posts/PostCard";

export default function PostSpecific() {
  let { id } = useParams();
  const url =
    "social/posts/" + id + "?_author=true&_comments=true&_reactions=true";

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  const getPosts = useCallback(
    async () => {
      try {
        const response = await http.get(url);
        setPost(response.data);
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

  const hasComments = post.comments.length;

  return (
    <Container>
      <PostCard
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        author={post.author}
        created={post.created}
        reactions={post.reactions}
        comments={post.comments}
        media={post.media}
        getPosts={getPosts}
      />
      <hr className="card-line"></hr>
      <h3>Comments</h3>
      <hr className="card-line"></hr>
      <Row xs={1} className="g-4 mb-5">
        {hasComments ? (
          post.comments.map((item) => {
            const { owner, body, created } = item;
            return (
              <Col key={created}>
                <Card bg="dark" className="card-width">
                  <Card.Body>
                    <Card.Title>{owner}</Card.Title>
                    <small className="card-profile-top__content--date">
                      {format(new Date(created), "d MMMM Y")}
                    </small>
                    <hr className="card-line"></hr>
                    <Card.Text>{body}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>
            <AlertInfo>This post has no comments.</AlertInfo>
          </Col>
        )}
      </Row>
    </Container>
  );
}
