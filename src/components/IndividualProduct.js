import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { Link } from "react-router-dom";
const IndividualProduct = ({ indivProduct, setIndivProduct }) => {
  // console.log("This is the indiv products", indivProduct);

  const { productId } = useParams();
  useEffect(() => {
    const fetchProductById = async () => {
      if (!productId) {
        return;
      }

      try {
        const indivData = await getProductById(productId);
        setIndivProduct(indivData);
        console.log("This is the indiv data", indivData);
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
          <img src={indivProduct.photo} />
          <p>{indivProduct.description}</p>
          <h5>${indivProduct.price}</h5>
          <Link to="/products/" className="view-details">
            Back to All Products
          </Link>
        </div>
      ) : (
        <h1> No products to display!</h1>
      )}
    </div>

    // <>
    //   <div className="all-products">
    //     {indivProduct && indivProduct.length ? (
    //       indivProduct.map((product) => {
    //         return (
    //           <div className="indiv-product" key={product.id}>
    //             <h3>{product.name}</h3>
    //             <img src={product.photo} />
    //             <p>{product.description}</p>
    //             <h5>{product.price}</h5>
    //           </div>
    //         );
    //       })
    //     ) : (
    //       <h1>No products to display!</h1>
    //     )}
    //   </div>
    // </>
  );
};

export default IndividualProduct;
