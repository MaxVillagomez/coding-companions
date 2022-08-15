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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  useEffect(() => {
    if (localStorage.token) {
        setToken(localStorage.token);
        setIsLoggedIn(!isLoggedIn);
    }
}, []);

  // useEffect(() => {
  //   const fetchProductById = async () => {
  //     if (!productId) {
  //       return;
  //     }

  //     try {
  //       const indivData = await getProductById(productId);
  //       setIndivProduct(indivData);
  //       console.log("This is the indiv data", indivData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchProductById();
  // }, [productId]);

  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/products"
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route path="/login" element={
            <Login 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              token={token} 
              setToken={setToken} 
              setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products/:productId"
            element={
              <IndividualProduct
                indivProduct={indivProduct}
                setIndivProduct={setIndivProduct}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
