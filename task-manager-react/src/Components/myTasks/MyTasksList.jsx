import React, { useState } from "react";
import TaskItem from "./TaskItem";
import Modal from "react-bootstrap/Modal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
const MyTasksList = ({ tasks }) => {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              setSelectedTask={setSelectedTask}
              setShowEditTaskModal={setShowEditTaskModal}
              setShowDeleteTaskModal={setShowDeleteTaskModal}
            />
          ))}
        </ul>
      )}

      <EditTaskModal
        showEditTaskModal={showEditTaskModal}
        setShowEditTaskModal={setShowEditTaskModal}
        taskToBeEdited={selectedTask}
      />

      <DeleteTaskModal
        showDeleteTaskModal={showDeleteTaskModal}
        setShowDeleteTaskModal={setShowDeleteTaskModal}
        taskToBeDeleted={selectedTask}
      />
    </div>
  );
};

export default MyTasksList;
