import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import { getAllProducts, getProductById } from "../axios-services";
import {
  Homepage,
  Navbar,
  Products,
  Login,
  Register,
  IndividualProduct,
  Cart,
} from "./index";
import "../style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [indivProduct, setIndivProduct] = useState([]);
  const [cart, setCart] = useState([]);

  const { productId } = useParams();
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);

        // console.log("This is the photo data", data[0].photo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleClick = (item) => {
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
      return;
    }
    setCart((cart) => [...cart, { ...item, quantity: 1 }]);
  };

  const handleDecClick = (item) => {
    if (item.quantity <= 1) {
      let cartFilter = cart.filter((cartItem) => cartItem.name !== item.name);
      console.log(cartFilter);
      setCart(cartFilter);
    }
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
      return;
    }

    setCart((cart) => [...cart, { ...item, quantity: 1 }]);
  };

  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                indivProduct={indivProduct}
                setIndivProduct={setIndivProduct}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                setProducts={setProducts}
                handleClick={handleClick}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products/:productId"
            element={
              <IndividualProduct
                indivProduct={indivProduct}
                setIndivProduct={setIndivProduct}
                handleClick={handleClick}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                handleClick={handleClick}
                handleDecClick={handleDecClick}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
