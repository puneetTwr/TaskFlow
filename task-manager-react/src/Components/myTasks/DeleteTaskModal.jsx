import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../../Styles/Tasks.css";
import { deleteTask } from "../../Services/task-service";
import { useAppContext } from "../../Contexts/AppContext";

const EditTaskModal = ({
  showDeleteTaskModal,
  setShowDeleteTaskModal,
  taskToBeDeleted,
}) => {
  const [taskData, setTaskData] = useState(taskToBeDeleted);
  const { allTasks, setAllTasks } = useAppContext();

  const handleClose = () => {
    setShowDeleteTaskModal(false);
    setTaskData(null);
  };

  const handleDeleteTask = async () => {
    await deleteTask(taskData._id);
    const taskIndex = allTasks.findIndex((t) => t._id === taskData._id);
    if (taskIndex !== -1) {
      const updatedTasks = [...allTasks];
      updatedTasks.splice(taskIndex, 1);
      setAllTasks(updatedTasks);
    }
    handleClose();
  };

  useEffect(() => {
    setTaskData(taskToBeDeleted);
    if (!taskToBeDeleted) {
      setShowDeleteTaskModal(false);
    }
  }, [taskToBeDeleted]);
  return (
    <Modal
      show={showDeleteTaskModal}
      onHide={handleClose}
      centered
      dialogClassName="deleteTaskModal"
    >
      <Modal.Header closeButton>
        <Modal.Title as={"h3"}>Delete Task ?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDeleteTask}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
