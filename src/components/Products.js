import React from "react";
import { Link } from "react-router-dom";
const Products = ({ products, setProducts }) => {
  return (
    <>
      <div className="all-products">
        {products && products.length ? (
          products.map((product) => {
            return (
              <div className="indiv-product" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.photo} />

                <h5>${product.price}</h5>

                <button className="add-to-cart-btn">Add to Cart</button>
                <Link to={`/products/${product.id}`} className="view-details">
                  View Details
                </Link>
              </div>
            );
          })
        ) : (
          <h1>No products to display!</h1>
        )}
      </div>
    </>
  );
};

export default Products;
