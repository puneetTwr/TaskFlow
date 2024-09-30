import React, { useState } from "react"; // Import useState
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../Services/user-services";
const Login = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Logging username and password
    console.log("Username:", username);
    console.log("Password:", password);

    // Here you would typically call an authentication function
    const response = await authenticateUser({ username, password });
    if (response && response.success) {
      navigate("/dashboard"); // Navigate to dashboard on successful login
    }
  };

  return (
    <div className="loginPage">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username} // Controlled input
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />

          <button type="submit">Login</button>
        </form>
      </div>
      <p>Or</p>
      <h2 className="signupLink">
        <Link to="/signup">Signup</Link>
      </h2>
    </div>
  );
};

export default Login;
