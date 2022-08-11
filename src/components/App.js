import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAllProducts } from '../axios-services';
import {Homepage} from './index'
import '../style/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log("this is the data: ", data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage products={products} setProducts={setProducts}/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
