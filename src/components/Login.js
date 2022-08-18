import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios-services";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    token,
    setToken,
    setIsLoggedIn,
  } = props;
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("This is email and password: ", email, password);

    const { user, token } = await login({ email, password });
    console.log("this is the data: ", user);
    localStorage.token = token;
    setIsLoggedIn(true);
    setToken(localStorage.token);
    setEmail("");
    setPassword("");
    navigate("/", { replace: true });
  }

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="label">
          Email:
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </label>
        <br />
        <label className="label">
          Password:
          <input
            type="text"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </label>
        <div className="login-button-and-link-container">
            <button type="submit">Login</button>
          <Link className="register-link" to="/register">
            New User? Register here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
