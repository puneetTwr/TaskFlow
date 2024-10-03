import React from "react";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
const Tabs = ({
  activeKey,
  onSelect,
  pendingTaskCount,
  completedTaskCount,
}) => {
  return (
    <Container fluid className="mb-3">
      <Nav variant="underline" activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item>
          <Nav.Link eventKey="pending" style={{ fontSize: "1.5rem" }}>
            <Badge color="secondary" badgeContent={pendingTaskCount}>
              Pending
            </Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="completed" style={{ fontSize: "1.5rem" }}>
            <Badge color="secondary" badgeContent={completedTaskCount}>
              Completed
            </Badge>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default Tabs;
