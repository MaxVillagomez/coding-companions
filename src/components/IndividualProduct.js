import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { Link } from "react-router-dom";
const IndividualProduct = ({ indivProduct, setIndivProduct, handleClick }) => {
  const { productId } = useParams();
  useEffect(() => {
    const fetchProductById = async () => {
      if (!productId) {
        return;
      }

      try {
        const indivData = await getProductById(productId);
        setIndivProduct(indivData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductById();
  }, [productId]);

  return (
    <div className="all-products">
      {indivProduct && indivProduct.id ? (
        <div className="indiv-product" key={productId.id}>
          <h3>{indivProduct.name}</h3>
          <img className="indiv-product-img" src={indivProduct.photo} />
          <p>{indivProduct.description}</p>
          <h5>${indivProduct.price}</h5>
          <button
            className="indiv-button"
            onClick={() => handleClick(indivProduct)}
          >
            {" "}
            Add to Cart{" "}
          </button>
          <Link to="/products/" className="view-details">
            Back to All Products
          </Link>
        </div>
      ) : (
        <h1> No products to display!</h1>
      )}
    </div>
  );
};

export default IndividualProduct;
