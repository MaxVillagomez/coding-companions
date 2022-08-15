import React from "react";

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
                        <p>{product.description}</p>
                        <h5>{product.price}</h5>
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

export default Products;