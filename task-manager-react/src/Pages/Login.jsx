import React, { useState } from "react"; // Import useState
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../Services/user-services";
import { useUser } from "../Contexts/UserProvider";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await authenticateUser({ username, password });
    if (response && response.success) {
      setUser(response.data.data);
      navigate("/dashboard");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
