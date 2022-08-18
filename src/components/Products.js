import React from "react";
import { Link } from "react-router-dom";
const Products = ({ products, setProducts, handleClick }) => {
  return (
    <>
      <div className="all-products-container">
        {products && products.length ? (
          products.map((product) => {
            return (
              <div className="all-products">
                <a
                  href={`/products/${product.id}`}
                  className="indiv-product"
                  key={product.id}
                >
                  <h3>{product.name}</h3>
                  <img src={product.photo} />

                  <h5>${product.price}</h5>
                </a>
                <button
                  onClick={() => handleClick(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
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
