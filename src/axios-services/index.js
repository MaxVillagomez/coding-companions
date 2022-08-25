import axios from "axios";

export async function getUsers(token) {
  try {
    const { data: users } = await axios.get("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return users;
  } catch (err) {
    console.error(err);
    next(error);
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");

    return data;
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    return data;
  } catch (error) {
    console.error(error);
    next(error);
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

    return data;
  } catch (error) {
    next(error);
  }
}

export async function getMe(token) {
  try {
    const { data } = await axios.get("/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Trouble getting me");
    next(error);
  }
}

export async function register({
  email,
  password,
  streetAddress,
  city,
  state,
  zip,
}) {
  try {
    const { data } = await axios.post("/api/users/register", {
      email,
      password,
      streetAddress,
      city,
      state,
      zip,
    });

    return data;
  } catch (error) {
    console.error("Trouble registering");
    throw error;
  }
}

export async function addProduct({
  name,
  description,
  photo,
  quantity,
  price,
  token,
}) {
  try {
    const { data } = await axios.post(
      "/api/products",
      { name, description, photo, quantity, price },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Trouble adding product...");
    next(error);
  }
}

export async function editProduct({
  productId,
  name,
  description,
  photo,
  quantity,
  price,
  token,
}) {
  try {
    const { data } = await axios.patch(
      `/api/products/${productId}`,
      { name, description, photo, quantity, price },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Trouble editing product...");
    next(error);
  }
}

export async function deleteProduct(token, productId) {
  try {
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    next(error);
  }
}
