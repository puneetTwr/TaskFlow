import React, { useEffect, useState } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import "../Styles/Tasks.css";

const RecentTask = ({
  task,
  setRecentTask,
  setShowRecentTask,
  setEditMode,
  editMode,
}) => {
  const { title, description, status, category, color, dueDate, priority } =
    task;
  const [progress, setProgress] = useState(0);

  const formatDueDate = (date) => {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const handleEditTask = () => {
    setTimeout(() => {
      setEditMode(true);
      setShowRecentTask(false);
    }, 0);
  };

  useEffect(() => {
    // Fill the progress bar in 5 seconds
    const totalDuration = 5000; // 5 seconds
    const intervalTime = 200; // 100 milliseconds
    const incrementValue = (100 / totalDuration) * intervalTime; // Increment value per interval

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev > 100) {
          clearInterval(interval);
          setShowRecentTask(false); // Remove the component after filling the bar
          return 100;
        }
        return prev + incrementValue; // Increment progress smoothly
      });
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [setRecentTask]);

  return (
    <Card className="recent-task-card" style={{ borderColor: color }}>
      <Card.Header>Task Created</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}

        <div className="d-flex flex-wrap mb-3">
          <div className="me-3">
            <strong>Status:</strong> {status}
          </div>
          <div className="me-3">
            <strong>Category:</strong> {category}
          </div>
          <div className="me-3">
            <strong>Due Date:</strong> {formatDueDate(dueDate)}
          </div>
          <div className="me-3">
            <strong>Priority:</strong> {priority}
          </div>
        </div>

        <Button variant="primary" onClick={handleEditTask}>
          Edit Task
        </Button>
        <ProgressBar animated now={progress} className="mt-3" />
      </Card.Body>
    </Card>
  );
};

export default RecentTask;
