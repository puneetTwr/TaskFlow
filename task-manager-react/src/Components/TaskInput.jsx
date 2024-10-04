import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Form,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { createTask, updateTask } from "../Services/task-service";
import "../Styles/Tasks.css";

const TaskInput = ({
  setRecentTask,
  setShowRecentTask,
  editTask,
  editMode,
  setEditMode,
}) => {
  const initialTaskData = {
    title: "",
    description: "",
    status: "pending",
    category: "",
    color: "",
    dueDate: "",
    priority: "low",
  };

  const [taskData, setTaskData] = useState(
    editMode ? editTask : initialTaskData
  );
  const [showDescription, setShowDescription] = useState(false);

  const resetForm = () => {
    setTaskData(initialTaskData);
    setShowDescription(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      if (!editMode) {
        const newCreatedTask = await createTask(taskData);
        setRecentTask(newCreatedTask);
      }

      if (editMode) {
        const updatedTask = await updateTask(taskData);
        setRecentTask(updatedTask);
        setEditMode(false);
      }

      resetForm();
      setShowRecentTask(true);
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
    if (editMode) {
      setTaskData(editTask);
      setShowDescription(editTask?.description ? true : false);
    }
  }, [editTask, editMode]);

  return (
    <div className="row mb-4 taskInput">
      <InputGroup className="mb-3" size="lg">
        <Form.Control
          name="title"
          placeholder="Task Title"
          aria-label="Task Title"
          value={taskData.title ?? ""}
          onChange={handleInputChange}
        />
      </InputGroup>

      <div className="d-flex flex-row outer">
        <div className="d-flex flex-row inner">
          <div>
            <Form.Label>Priority</Form.Label>
            <DropdownButton
              title={`${taskData.priority}`}
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
                onClick={() => setTaskData({ ...taskData, priority: "medium" })}
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

          <div>
            <Form.Label>Category</Form.Label>
            <DropdownButton
              title={`${taskData.category || "None"}`}
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
                onClick={() => setTaskData({ ...taskData, category: "Study" })}
              >
                Study
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setTaskData({ ...taskData, category: "Others" })}
              >
                Others
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <div>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <DropdownButton
                title={`${taskData.color || "None"}`}
                variant={getButtonVariant(taskData.color)}
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
                  onClick={() => setTaskData({ ...taskData, color: "yellow" })}
                >
                  Yellow
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </div>

          <div>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={taskData.dueDate ?? ""}
                onChange={handleInputChange}
                aria-label="Due Date"
                className="taskOptions"
              />
            </Form.Group>
          </div>
        </div>

        <div className="d-flex flex-row inner">
          <div>
            <Form.Check
              type="switch"
              id="showDescription"
              label="Show Description"
              checked={showDescription}
              onChange={() => setShowDescription(!showDescription)}
            />
          </div>
        </div>
      </div>

      {showDescription && (
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            name="description"
            placeholder="Task Description"
            aria-label="Task Description"
            value={taskData.description ?? ""}
            onChange={handleInputChange}
          />
        </InputGroup>
      )}

      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </div>
  );
};

export default TaskInput;
