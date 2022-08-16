import React, { useEffect, useState } from "react";

const Cart = ({ cart, setCart, handleClick, handleDecClick }) => {
  //   console.log("This is the quantity", quantity);
  //   console.log("This is the cart", cart);
  return (
    <div>
      {cart.map((item) => (
        <div className="cart-box" key={item.id}>
          <h3>{item.name}</h3>
          <h5>{item.price * item.quantity}</h5>
          <button onClick={() => handleClick(item)}>+</button>
          <h5>{item.quantity}</h5>

          <button onClick={() => handleDecClick(item)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
