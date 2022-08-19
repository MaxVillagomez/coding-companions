import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, editProduct, deleteProduct } from "../axios-services";
import { Link } from "react-router-dom";

const EditIndivProduct = (props) => {
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
        indivProduct,
        setIndivProduct
    } = props;

    const { productId } = useParams();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (token) {
            try {
                const data = await editProduct({productId, name, description, photo, quantity, price, token});
                setName('');
                setDescription('');
                setPhoto('');
                setQuantity(0);
                setPrice(0);
                return data;
            } catch (error) {
                throw error;
            }
        } else {
            return
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        if (token) {
            try {
                const data = await deleteProduct(token, productId)
                return data;
            } catch (error) {
                throw error;
            }
        } else {
            return
        }
    }


  useEffect(() => {
    const fetchProductById = async () => {
      if (!productId) {
        return;
      }

      try {
        const indivData = await getProductById(productId);
        setIndivProduct(indivData);
        console.log("This is the indiv data", indivData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductById();
  }, [productId]);


    return(
        <div>
            <div className="all-products">
                {indivProduct && indivProduct.id ? (
                <div className="indiv-product" key={productId.id}>
                    <h3>{indivProduct.name}</h3>
                    <img className="indiv-product-img" src={indivProduct.photo} />
                    <p>{indivProduct.description}</p>
                    <h5>${indivProduct.price}</h5>
                </div>
                ) : (
                <h1> No products to display!</h1>
                )}
            </div>

            <form>
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
                <button type='submit' onClick={handleSubmit}>Edit Product</button>
                <button type='submit' onClick={handleDelete}>Delete Product</button>
            </form>
        </div>
    )
}

export default EditIndivProduct;