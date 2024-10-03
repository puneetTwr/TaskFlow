import React, { useState } from "react";
import TaskItem from "./TaskItem";
import Modal from "react-bootstrap/Modal";

const MyTasksList = ({ tasks }) => {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
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
            />
          ))}
        </ul>
      )}

      <Modal
        show={showEditTaskModal}
        onHide={() => setShowEditTaskModal(false)}
      >
        Hellow
      </Modal>
    </div>
  );
};

export default MyTasksList;
