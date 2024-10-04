// src/Components/TaskItem.js
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useAppContext } from "../../Contexts/AppContext";
import { updateTask } from "../../Services/task-service";

const TaskItem = ({
  task,
  setShowEditTaskModal,
  setSelectedTask,
  setShowDeleteTaskModal,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { allTasks, setAllTasks } = useAppContext();

  const editTask = () => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };
  const deleteTask = () => {
    setSelectedTask(task);
    setShowDeleteTaskModal(true);
  };
  const markAsCompleted = async (e) => {
    e.stopPropagation();
    try {
      const updatedTask = await updateTask({ ...task, status: "completed" });
      const taskIndex = allTasks.findIndex((t) => t._id === updatedTask._id);
      if (taskIndex !== -1) {
        const updatedTasks = [...allTasks];
        updatedTasks[taskIndex] = updatedTask;

        setAllTasks(updatedTasks);
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    if (task.status === "completed") {
      setIsCompleted(true);
    }
  }, [task.status]);

  useEffect(() => {}, []);

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
        <Card.Body className="d-flex align-items-center taskItem">
          <div className="flex-grow-1">
            <div className="taskTitle">
              <Card.Title
                as="h3"
                className={isCompleted ? "strikethrough" : ""}
              >
                {task.title}
              </Card.Title>              
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
          <div className="actionButtons">
            {!isCompleted && (
              <div className="editTask">
                <button
                  onClick={editTask}
                  className="btn btn-outline-primary btn-sm"
                >
                  Edit <MdEdit />
                </button>
              </div>
            )}
            <div className="deleteTask">
              <button
                onClick={deleteTask}
                className="btn btn-outline-danger btn-sm"
              >
                Delete <FaTrashAlt />
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskItem;
