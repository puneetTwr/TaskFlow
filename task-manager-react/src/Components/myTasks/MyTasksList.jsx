import React from "react";
import TaskItem from "./TaskItem";
const MyTasksList = ({ tasks }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTasksList;
