// src/Components/TaskItem.js
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaRegCircle, FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const TaskItem = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const markAsCompleted = () => {
    setIsCompleted(true);
  };
  return (
    <Container fluid className="d-flex">
      <div className="checkTask m-2" onClick={markAsCompleted}>
        {!isCompleted ? (
          <>
            <FaRegCircle className="circle-icon" />
            <FaRegCheckCircle className="check-icon" />
          </>
        ) : (
          <FaCheckCircle className="check-icon-completed" />
        )}
      </div>

      <Card
        className="mb-3 taskItem w-100 "
        style={{ borderLeft: `10px solid ${task.color || "grey"}` }}
      >
        <Card.Body className="d-flex align-items-center">
          <div className="flex-grow-1">
            <div className="taskTitle">
              <Card.Title
                as="h3"
                className={isCompleted ? "strikethrough" : ""}
              >
                {task.title}
              </Card.Title>
              <div className="editTask">
                <button className="btn btn-outline-primary btn-sm">
                  Edit <MdEdit />
                </button>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                {task.category && <div className="me-3">{task.category}</div>}
                <div className="me-3">
                  <strong>Priority:</strong> {task.priority}
                </div>
              </div>
              {task.dueDate && (
                <div className="me-3">
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskItem;
