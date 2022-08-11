import React from "react";

const Homepage = ({products, setProducts}) => {
    return (
        <div>
            <div>
                <h3>View Our Products Below</h3>
            </div>
            {
                products && products.length ? (
                    products.map((product) => {
                        return (
                            <div key={product.id}>
                                <h1>{product.name}</h1>
                                <img src={product.photo}/>
                                <p>{product.description}</p>
                                <h3>{product.price}</h3>
                            </div>
                        );
                    })
                ) : (
                    <h1>No products to display!</h1>
                )
            }
        </div>
    )
};

export default Homepage;