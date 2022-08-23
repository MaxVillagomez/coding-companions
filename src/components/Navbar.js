import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  isAdmin,
  setIsAdmin,
  countCartItems,
  cart,
}) => {
  function logOut() {
    delete localStorage.token;
    setToken("");
    setIsLoggedIn(false);
    window.location.reload(false);
  }

  return (
    <header>
      <nav className="nav-bar">
        <Link to="/">
          <h3 className="site-name">Coding Companions</h3>
        </Link>
        <div className="nav-link-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <Link className="nav-link" to="/cart">
            Cart ({countCartItems})
          </Link>
          {isAdmin ? (
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          ) : null}
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
