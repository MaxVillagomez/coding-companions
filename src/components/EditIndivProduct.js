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
                console.log("this is name in editindivproduct: ", name);
                const data = await editProduct({productId, name, description, photo, quantity, price, token});
                // setName('');
                // setDescription('');
                // setPhoto('');
                // setQuantity(0);
                // setPrice(0);
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
        setName(indivData.name);
        setDescription(indivData.description);
        setPrice(indivData.price);
        setPhoto(indivData.photo);
        setQuantity(indivData.quantity);
        console.log("This is the indiv data", indivData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductById();
  }, [productId]);

//   const handleFormChange = (event) => {
//     setName(event.target.value);
//     setDescription({[event.target.name]: event.target.value});
//     setPhoto({[event.target.name]: event.target.value});
//     setQuantity({[event.target.name]: event.target.value});
//     setPrice({[event.target.name]: event.target.value});
//   }


    return(
        <div className="form-container">
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

            <form className="edit-product-form">
                <label>
                    Name:
                    <input 
                        type='text' 
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    ></input>
                </label>
                <label>
                    Description:
                    <input 
                        type='text'
                        value={description}
                        onChange={(event) => {setDescription(event.target.value)}}
                    ></input>
                </label>
                <label>
                    Photo URL:
                    <input 
                        type='text'
                        value={photo}
                        onChange={(event) => {setPhoto(event.target.value)}}
                    ></input>
                </label>
                <label>
                    Quantity:
                    <input 
                        type='text'
                        value={quantity}
                        onChange={(event) => {setQuantity(event.target.value)}}
                    ></input>
                </label>
                <label>
                    Price:
                    <input 
                        type='text'
                        value={price}
                        onChange={(event) => {setPrice(event.target.value)}}
                    ></input>
                </label>
                
                <div className="edit-and-delete-button-container">
                    <button type='submit' onClick={handleSubmit}>Edit Product</button>
                    <button type='submit' onClick={handleDelete}>Delete Product</button>
                </div>
            </form>
        </div>
    )
}

export default EditIndivProduct;