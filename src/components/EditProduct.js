import React from "react";
import { useNavigate } from "react-router-dom";

const EditProduct = ({products}) => {
    
    const navigate = useNavigate();

    return (
        <>
      <div key={products.id} className="all-products-container">
        {products && products.length ? (
            products.map((product) => {
            return (
              <div className="all-products">
                <a
                  href={`/admin/products/${product.id}`}
                  className="indiv-product"
                >
                  <h3>{product.name}</h3>
                  <img src={product.photo} />

                  <h5>${product.price}</h5>
                </a>
                <button
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                  className="add-to-cart-btn"
                >
                  Edit Product
                </button>
              </div>
            );
          })
        ) : (
          <h1>No products to display!</h1>
        )}
      </div>
    </>
    )
}

export default EditProduct;