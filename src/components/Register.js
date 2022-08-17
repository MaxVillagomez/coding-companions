import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="form-container">
      <form className="login-form">
        <label className="label">
          Email
          <input type="text"></input>
        </label>
        <label className="label">
          Password
          <input type="text"></input>
        </label>
        <label className="label">
          Street Address
          <input type="text"></input>
        </label>
        <label className="label">
          City
          <input type="text"></input>
        </label>
        <label className="label">
          State
          <input type="text"></input>
        </label>
        <label className="label">
          Zip
          <input type="text"></input>
        </label>
        <button type="submit">Register</button>
      </form>

      <div>
        <Link className="register-link" to="/login">
          Already a User? Login here!
        </Link>
      </div>
    </div>
  );
};

export default Register;
