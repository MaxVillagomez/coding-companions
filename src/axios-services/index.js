import axios from "axios";


// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:


  export async function getUsers(token) {
    try {
      const { data: users } = await axios.get('/api/users',
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      return users;
    } catch(err) {
      console.error(err)
      throw error;
    }
  }


export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    console.log("This is all products data: ", data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function login({ email, password }) {
  try {
    const { data } = await axios.post(`/api/users/login`, { email, password });
    console.log("this is the log in data: ", data);
    return data;
  } catch (error) {
    next(error);
  }
}

export async function getMe (token) {
  try {
    const { data } = await axios.get("/api/users/me", 
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    return data;
  } catch (error) {
    console.error("Trouble getting me");
    throw error;
  }
}

export async function register ({ email, password, streetAddress, city, state, zip }) {
  try {
    const { data } = await axios.post("/api/users/register", {email, password, streetAddress, city, state, zip});
    console.log("this is the register data:", data);
    return data;
  } catch (error) {
    console.error("Trouble registering");
    throw error;
  }
}



export async function addProduct ({name, description, photo, quantity, price, token}) {
  console.log("This is token in addProduct: ", token);
  try {
    const { data } = await axios.post("/api/products",
        {name,
        description,
        photo,
        quantity, 
        price}, 
        {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("this is data in addProduct axios: ", data);
    return data;
  } catch (error) {
    console.error("Trouble adding product...")
    throw error;
  }
}

export async function editProduct ({productId, name, description, photo, quantity, price, token}) {
  try {
    const {data} = await axios.patch(`/api/products/${productId}`,
    {name,
    description,
    photo,
    quantity, 
    price},
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Trouble editing product...")
    throw error;
  }
}

export async function deleteProduct (token, productId) {
  try {
    const {data} = await axios.delete(`/api/products/${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("This the delete data: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}