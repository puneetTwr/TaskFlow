import React, { useState } from "react";
import { createUser } from "../Services/user-services";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createUser({ username, password, name, email });

      if (response && response.success) {
        console.log(response);
        navigate("/dashboard");
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
      } else {
        console.error("Error creating user:", response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="loginPage">
      <div className="login">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />

          <button type="submit">Sign up</button>
        </form>
      </div>
      <p>Or</p>
      <h2 className="signupLink">
        <Link to="/login">Login</Link>
      </h2>
    </div>
  );
};

export default Signup;
