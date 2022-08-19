import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setToken, setIsLoggedIn }) => {
  function logOut() {
    delete localStorage.token;
    setToken("");
    setIsLoggedIn(false);
    // setUser({});
  }
  return (
    <header>
      <nav className="nav-bar">
        <h3 className="site-name">Coding Companions</h3>
        <div className="nav-link-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
          {isLoggedIn ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
