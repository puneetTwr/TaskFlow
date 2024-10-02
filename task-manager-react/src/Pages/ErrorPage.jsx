import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { BsExclamationTriangleFill } from "react-icons/bs"; // Bootstrap icon

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card
            className="text-center shadow-lg p-4"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body>
              <BsExclamationTriangleFill
                size={60}
                className="text-warning mb-3"
              />
              <Card.Title
                as="h1"
                className="mb-3"
                style={{ fontWeight: "bold" }}
              >
                Oops! Something Went Wrong
              </Card.Title>
              <Card.Text className="mb-4" style={{ fontSize: "1.2rem" }}>
                {error.statusText ||
                  error.message ||
                  "An unexpected error occurred."}
              </Card.Text>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/")}
                className="px-4"
              >
                Go Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
