import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import { getAllProducts, getProductById, getMe } from "../axios-services";
import {
  Homepage,
  Navbar,
  Products,
  Login,
  Register,
  IndividualProduct,
  Cart,
  Checkout,
  Confirmation,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [ user, setUser] = useState({});
  const [ city, setCity] = useState('');
  const [ streetAddress, setStreetAddress] = useState('');
  const [ state, setState] = useState('');
  const [ zip, setZip] = useState('');

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

  const handleClickRemove = (item) =>{
    const items = cart.filter((cartItem) => cartItem.name !== item.name);
    console.log(items);
    setCart(items);
  }

  useEffect(() => {
        if (localStorage.token) {
            setToken(localStorage.token);
            setIsLoggedIn(!isLoggedIn);
        }
    }, []);

  //   // useEffect(() => {
  //   //     if (!isLoggedIn) {
  //   //         setCart('');
  //   //     }
  //   // })

    // useEffect(() => {
    //     if (token) {
    //         const fetchMe = async () => {
    //             const { data } = await getMe(token);
    //             console.log("This is the data:", data);
    //             setUser({  });
    //         };
    //         fetchMe();
    //     }
    // }, [isLoggedIn]);

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
                handleClick={handleClick}
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
          <Route path="/login" element={
            <Login 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              token={token}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
            />} />
          <Route path="/register" element={<Register email={email} setEmail={setEmail} password={password} setPassword={setPassword} streetAddress={streetAddress} setStreetAddress={setStreetAddress} state={state} setState={setState} city={city} setCity={setCity} zip={zip} setZip={setZip}/>} />
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
                handleClickRemove={handleClickRemove}
              />
            }
          />
          
          <Route path="/checkout" element={<Checkout cardNumber = {cardNumber} setCardNumber ={setCardNumber}/>} />
          <Route path="/confirmation" element={<Confirmation />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
