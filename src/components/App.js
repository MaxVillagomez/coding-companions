import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAllProducts } from "../axios-services";
import { Homepage, Navbar, Products, Login, Register } from "./index";
import "../style/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [productImg, setProductImg] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setProductImg(data.photo);
        console.log("this is the data: ", data);
        console.log("This is the photo data", data[0].photo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
              />
            }
          />
          <Route path="/products" element={<Products 
                products={products}
                setProducts={setProducts}
                productImg={productImg}
                setProductImg={setProductImg}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
