import React from "react";
import { addProduct } from "../axios-services";

const AddProduct = (props) => {
  const {
    token,
    name,
    setName,
    description,
    setDescription,
    photo,
    setPhoto,
    quantity,
    setQuantity,
    price,
    setPrice,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (token) {
      try {
        const data = await addProduct({
          name,
          description,
          photo,
          quantity,
          price,
          token,
        });
        setName("");
        setDescription("");
        setPhoto("");
        setQuantity(0);
        setPrice(0);

        return data;
      } catch (error) {
        throw error;
      }
    } else {
      return;
    }
  };

  return (
    <div className="form-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
          ></input>
        </label>
        <label>
          Quantity:
          <input
            type="text"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          ></input>
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
        </label>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
