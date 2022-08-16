const express = require("express");
const apiRouter = express.Router();
const { getAllCartOrders } = require("../db");
const session = require("express-session");
apiRouter.get("/", async (req, res, next) => {
  try {
    const cartOrders = await getAllCartOrders();
    res.send(cartOrders);
  } catch (error) {
    console.log("Trouble getting cart orders");
    throw error;
  }
});

apiRouter.get("/items", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("No items to display");
  } else {
    res.send(cart);
  }
});

apiRouter.post("/items", (req, res, next) => {
  const { name, description, photo, quantity, price } = req.body;
  console.log(
    "This is everything: ",
    name,
    description,
    photo,
    quantity,
    price
  );
  const cartItem = { name, description, photo, quantity, price };
  const { cart } = req.session;

  if (cart) {
    const { items } = cart;
    items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(200);
});

module.exports = apiRouter;
