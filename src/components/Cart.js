import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart, handleClick, handleDecClick, handleClickRemove }) => {
  //   console.log("This is the quantity", quantity);
  //   console.log("This is the cart", cart);

  let subTotal = 0
  cart.map(item => {
    subTotal += item.price * item.quantity;
  });

  return (
    <div>
      {cart.map((item) => (
        <div className="cart-box" key={item.id}>
          <h3>{item.name}</h3>
          <h5>{item.price * item.quantity}</h5>
          <button onClick={() => handleClick(item)}>+</button>
          <h5>{item.quantity}</h5>
          <button onClick={() => handleDecClick(item)}>-</button>
          <button onClick={() => handleClickRemove(item)}>Remove Item</button>
        </div>
      ))}
          <h5>Total {subTotal}</h5>
          {subTotal ? <Link to='/checkout'>
          <button>Proceed to Checkout</button>
          </Link> : <h1>Add Items to your Cart</h1>}
    </div>
  );
};

export default Cart;
