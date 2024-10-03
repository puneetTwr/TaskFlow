import React, { useEffect, useState } from "react";
import { getAllTasks } from "../Services/task-service";
import { Container } from "react-bootstrap";
import MyTasksList from "../Components/myTasks/MyTasksList";
import Tabs from "../Components/Tabs";
import { useNavigate } from "react-router-dom";
import "../Styles/MyTasks.css";
import { useAppContext } from "../Contexts/AppContext";

const MyTasks = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  // const [pendingTaskCount, setPendingTaskCount] = useState(0);
  // const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { user, allTasks, setAllTasks } = useAppContext();
  const navigate = useNavigate();
  const handleSelect = (key) => {
    setSelectedTab(key);
  };
  const getPendingTasks = (tasks) => {
    return tasks
      .filter((task) => task.status === "pending")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getCompletedTasks = (tasks) => {
    return tasks
      .filter((task) => task.status === "completed")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks();
        const pendingTasks = getPendingTasks(tasks);
        const completedTasks = getCompletedTasks(tasks);
        setPendingTasks(pendingTasks);
        setCompletedTasks(completedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [allTasks]);

  useEffect(() => {
    if (!user) {
      console.log("user not found !!!");
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {}, []);
  return (
    <Container fluid className="dashboardPage">
      <h1>My Tasks</h1>
      <Tabs
        selectedTab={selectedTab}
        onSelect={handleSelect}
        pendingTaskCount={pendingTasks.length}
        completedTaskCount={completedTasks.length}
      />
      <MyTasksList
        tasks={selectedTab === "pending" ? pendingTasks : completedTasks}
      />
    </Container>
  );
};

export default MyTasks;
