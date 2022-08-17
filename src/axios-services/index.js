import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
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
    throw error;
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