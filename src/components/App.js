import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import {
  getAllProducts,
  getProductById,
  getMe,
  getUsers,
  addProduct,
} from "../axios-services";
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
  Admin,
  AllUsers,
  AddProduct,
  EditProduct,
  EditIndivProduct,
} from "./index";
import "../style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const App = () => {
  const [products, setProducts] = useState([]);
  const [indivProduct, setIndivProduct] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [cardNumber, setCardNumber] = useState("");
  const [users, setUsers] = useState({});
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
      setIsLoggedIn(!isLoggedIn);
      setIsAdmin(!isAdmin);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
    const fetchAllUsers = async () => {
      if (token) {
        try {
          const data = await getUsers(token);
          console.log("This is the users data: ", data);
          setUsers(data.users);
          // console.log("This is the photo data", data[0].photo);
        } catch (error) {
          console.error(error);
        }
      } else {
        return;
      }
    };
    fetchAllUsers();
  }, [token]);

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

  const handleClickRemove = (item) => {
    const items = cart.filter((cartItem) => cartItem.name !== item.name);
    console.log(items);
    setCart(items);
  };

  return (
    <div className="app-container">
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
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
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                token={token}
                setToken={setToken}
                setIsLoggedIn={setIsLoggedIn}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                streetAddress={streetAddress}
                setStreetAddress={setStreetAddress}
                state={state}
                setState={setState}
                city={city}
                setCity={setCity}
                zip={zip}
                setZip={setZip}
                setIsLoggedIn={isLoggedIn}
              />
            }
          />
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

          <Route
            path="/checkout"
            element={
              <Checkout cardNumber={cardNumber} setCardNumber={setCardNumber} />
            }
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/users"
            element={<AllUsers users={users} setUsers={setUsers} />}
          />
          <Route
            path="/admin/createproduct"
            element={
              <AddProduct
                token={token}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                photo={photo}
                setPhoto={setPhoto}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
              />
            }
          />
          <Route
            path="/admin/products/:productId"
            element={
              <EditIndivProduct
                token={token}
                products={products}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                photo={photo}
                setPhoto={setPhoto}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                indivProduct={indivProduct}
                setIndivProduct={setIndivProduct}
              />
            }
          />
          <Route
            path="/admin/products"
            element={<EditProduct products={products} />}
          />
        </Routes>
      </Router>

      <footer className="footer-container">
        <p>
          Website built and designed by Luke Bourneuf, Austin Benton, and Max
          Villagomez
        </p>
      </footer>
    </div>
  );
};

export default App;
