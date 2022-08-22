import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../axios-services";
import { luke } from "./imgs/lukefunkopop.png";

const Homepage = () => {
  return (
    <div className="view-popular-products-container">
      <h1 className="view-popular-products">
        Meet the creators of Coding Companions!
      </h1>
      <div className="creators-container">
        <div className="featured-product">
          <h3>Luke Bourneuf</h3>
          <img
            className="featured-product-img"
            src="https://www.funko.com/pyimg/generated/bd87e2a0c8c318c8c25dcc425e9c51b0.png"
          />
          <h5>$826.22</h5>
          <a href="https://www.linkedin.com/in/lbourneuf/" target="_blank">
            <button className="dev-link-button">View Linkedin</button>
          </a>
          <a href="https://github.com/lbourneuf" target="_blank">
            <button className="dev-link-button">View Github</button>
          </a>
        </div>

        <div className="featured-product">
          <h3>Max Villagomez</h3>
          <img
            className="featured-product-img"
            src="https://www.funko.com/pyimg/generated/7321d65ed6ad53ecc400da186dca183d.png"
          />
          <h5>$826.22</h5>
          <a href="https://www.linkedin.com/in/max-villagomez/" target="_blank">
            <button className="dev-link-button">View Linkedin</button>
          </a>
          <a href="https://github.com/MaxVillagomez" target="_blank">
            <button className="dev-link-button">View Github</button>
          </a>
        </div>

        <div className="featured-product">
          <h3>Austin Benton</h3>
          <img
            className="featured-product-img"
            src="https://www.funko.com/pyimg/generated/1eb7c484dbbffc6bd9b2cb3a4d20d320.png"
          />
          <h5>$826.22</h5>
          <a
            href="https://www.linkedin.com/in/austin-mic-benton/"
            target="_blank"
          >
            <button className="dev-link-button">View Linkedin</button>
          </a>
          <a href="https://github.com/austinmbenton" target="_blank">
            <button className="dev-link-button">View Github</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
