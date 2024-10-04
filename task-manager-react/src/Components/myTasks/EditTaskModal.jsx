import React, { useState } from "react";
import { useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,  
} from "react-bootstrap";
import { useAppContext } from "../../Contexts/AppContext";
import { updateTask } from "../../Services/task-service";

const EditTaskModal = ({
  showEditTaskModal,
  setShowEditTaskModal,
  taskToBeEdited,
}) => {
  const [taskData, setTaskData] = useState(taskToBeEdited);
  const [showDescription, setShowDescription] = useState(false);
  const { allTasks, setAllTasks } = useAppContext();
  const handleClose = () => {
    setShowEditTaskModal(false);
    setTaskData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateTask = async () => {
    const updatedTask = await updateTask(taskData);
    const taskIndex = allTasks.findIndex((t) => t._id === updatedTask._id);
    if (taskIndex !== -1) {
      const updatedTasks = [...allTasks];
      updatedTasks[taskIndex] = updatedTask;
      setAllTasks(updatedTasks);
    }
    handleClose();
  };

  const getButtonVariant = (color) => {
    switch (color) {
      case "red":
        return "danger";
      case "blue":
        return "primary";
      case "green":
        return "success";
      case "yellow":
        return "warning";
      default:
        return "outline-secondary";
    }
  };

  useEffect(() => {
    setTaskData(taskToBeEdited);
    if (taskToBeEdited?.description) {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
    if (!taskToBeEdited) {
      setShowEditTaskModal(false);
    }
  }, [taskToBeEdited]);
  return (
    <Modal
      show={showEditTaskModal}
      onHide={handleClose}
      centered
      dialogClassName="editTaskModal"
    >
      <Modal.Header closeButton>
        <Modal.Title as={"h3"}>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Task Title */}
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="Task Title"
              value={taskData?.title ?? ""}
              onChange={handleInputChange}
              autoFocus
            />
          </Form.Group>

          {/* Priority, Category, Color, Due Date */}
          <div className="d-flex flex-wrap mb-3">
            {/* Priority */}
            <div className="me-3">
              <Form.Label>Priority</Form.Label>
              <DropdownButton
                title={taskData?.priority || "N/A"}
                variant="outline-secondary"
                id="priority-dropdown"
                className="taskOptions"
              >
                <Dropdown.Item
                  onClick={() => setTaskData({ ...taskData, priority: "low" })}
                >
                  Low
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setTaskData({ ...taskData, priority: "medium" })
                  }
                >
                  Medium
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setTaskData({ ...taskData, priority: "high" })}
                >
                  High
                </Dropdown.Item>
              </DropdownButton>
            </div>

            {/* Category */}
            <div className="me-3">
              <Form.Label>Category</Form.Label>
              <DropdownButton
                title={taskData?.category || "N/A"}
                variant="outline-secondary"
                id="category-dropdown"
                className="taskOptions"
              >
                <Dropdown.Item
                  onClick={() => setTaskData({ ...taskData, category: "Work" })}
                >
                  Work
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setTaskData({ ...taskData, category: "Personal" })
                  }
                >
                  Personal
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setTaskData({ ...taskData, category: "Study" })
                  }
                >
                  Study
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setTaskData({ ...taskData, category: "Others" })
                  }
                >
                  Others
                </Dropdown.Item>
              </DropdownButton>
            </div>

            {/* Color */}
            <div className="me-3">
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <DropdownButton
                  title={taskData?.color || "N/A"}
                  variant={getButtonVariant(taskData?.color)}
                  id="color-dropdown"
                  className="taskOptions"
                >
                  <Dropdown.Item
                    onClick={() => setTaskData({ ...taskData, color: "red" })}
                  >
                    Red
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setTaskData({ ...taskData, color: "blue" })}
                  >
                    Blue
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setTaskData({ ...taskData, color: "green" })}
                  >
                    Green
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      setTaskData({ ...taskData, color: "yellow" })
                    }
                  >
                    Yellow
                  </Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </div>

            {/* Due Date */}
            <div className="me-3">
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={taskData?.dueDate ?? ""}
                  onChange={handleInputChange}
                  aria-label="Due Date"
                />
              </Form.Group>
            </div>
          </div>

          {/* Show Description Switch */}
          <Form.Check
            type="switch"
            id="showDescription"
            label="Show Description"
            checked={showDescription}
            onChange={() => setShowDescription(!showDescription)}
          />

          {/* Task Description */}
          {showDescription && (
            <Form.Group className="mt-3">
              <Form.Label>Task Description</Form.Label>
              <InputGroup size="lg">
                <Form.Control
                  name="description"
                  placeholder="Task Description"
                  value={taskData?.description ?? ""}
                  onChange={handleInputChange}
                  as="textarea"
                  rows={3}
                />
              </InputGroup>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTask}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
