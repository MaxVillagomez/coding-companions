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
    error,
    setError,
    demoEmail,
    demoPassword,
  } = props;

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = await login({ email, password });
    const { user, token } = data;
    if (data.error) console.log("this is the data: ", user);
    if (token) {
      localStorage.token = token;
      setIsLoggedIn(true);
      setToken(localStorage.token);
      navigate("/", { replace: true });
    } else {
      alert(
        "Incorrect Credentials. Please check your credentials and log in again."
      );
    }
    setEmail("");
    setPassword("");
    window.location.reload(false);
  }

  async function handleDemoSubmit (event) {
    event.preventDefault();
    setEmail("demo");
    setPassword("demo");
    setIsLoggedIn(true);
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
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </label>
        <div className="login-button-and-link-container">
          <button type="submit">Login</button>
          <button type="submit" onClick={handleDemoSubmit}>Demo Login</button>
          <Link className="register-link" to="/register">
            New User? Register here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
