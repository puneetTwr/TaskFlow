import React, { useEffect, useState } from "react";
import { getAllTasks } from "../Services/task-service";
import { Container } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import MyTasksList from "../Components/myTasks/MyTasksList";
import Tabs from "../Components/Tabs";
import "../Styles/MyTasks.css";

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [activeKey, setActiveKey] = useState("pending");
  const [pendingTaskCount, setPendingTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const handleSelect = (key) => {
    setActiveKey(key);
  };
  const getPendingTaskCount = () => {
    return myTasks.filter((task) => task.status === "pending").length;
  };
  const getCompletedTaskCount = () => {
    return myTasks.filter((task) => task.status === "completed").length;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks();
        const pendingTaskCount = getPendingTaskCount();
        setPendingTaskCount(pendingTaskCount);
        const completedTaskCount = getCompletedTaskCount();
        setCompletedTaskCount(completedTaskCount);
        setMyTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [myTasks]);

  useEffect(() => {
    console.log({ myTasks });
  }, [myTasks]);
  return (
    <Container fluid className="dashboardPage">
      <h1>My Tasks</h1>
      <Tabs activeKey={activeKey} onSelect={handleSelect} pendingTaskCount={pendingTaskCount} completedTaskCount={completedTaskCount} />
      <MyTasksList tasks={myTasks} />
    </Container>
  );
};

export default MyTasks;
