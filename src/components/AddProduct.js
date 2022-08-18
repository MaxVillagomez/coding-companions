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
        setPrice
    } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (token) {
            try {
                const data = await addProduct({name, description, photo, quantity, price});
                setName('');
                setDescription('');
                setPhoto('');
                setQuantity(0);
                setPrice(0);
                console.log("This is the add product data: ", data)
                return data;
            } catch (error) {
                throw error;
            }
        } else {
            return
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input 
                type='text' 
                value={name}
                onChange={(event) => setName(event.target.value)}
            ></input>
        </label>
        <label>
            Description:
            <input 
                type='text'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            ></input>
        </label>
        <label>
            Photo:
            <input 
                type='text'
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
            ></input>
        </label>
        <label>
            Quantity:
            <input 
                type='text'
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
            ></input>
        </label>
        <label>
            Price:
            <input 
                type='text'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            ></input>
        </label>
        <button type='submit'>Create Product</button>
    </form>
    )
}

export default AddProduct;