import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../axios-services";

const Homepage = () => {
  return (
    <a href='/products/10'className="view-popular-products-container">
      <h1 className="view-popular-products">View Our Most Recent Addition!</h1>

      <div className="featured-product">
        <h3>Deadpool Coding Companion</h3>
        <img className="featured-product-img" src="https://legacycomics.com/wp-content/uploads/2020/04/POP-DEADPOOL-546.jpg" />
        <h5>$19.99</h5>
        <p>Click to view more details!</p>
      </div>
    </a>
  );
};

export default Homepage;
