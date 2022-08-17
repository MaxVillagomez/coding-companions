import React from "react";
import { Link } from "react-router-dom";
import { register } from "../axios-services";
const Register = ({ email, setEmail, password, setPassword, city, setCity, zip, setZip, state, setState, streetAddress, setStreetAddress }) => {
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await register(email, password, city, zip, state, streetAddress);
    if(result) {
      localStorage.setItem("token", result);
    }
  }
  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="label">
          Email
          <input type="text" placeholder="email" value={email}></input>
        </label>
        <label className="label">
          Password
          <input type="text" placeholder="password" value={password}></input>
        </label>
        <label className="label">
          Street Address
          <input type="text" placeholder="street address" value={streetAddress}></input>
        </label>
        <label className="label">
          City
          <input type="text" placeholder="city" value={city}></input>
        </label>
        <label className="label">
          State
          <input type="text" placeholder="state" value={state}></input>
        </label>
        <label className="label">
          Zip
          <input type="text" placeholder="zip" value={zip}></input>
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
