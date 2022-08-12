const client = require("../client");

async function createProduct({ name, description, photo, quantity, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, description, photo, quantity, price)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
      [name, description, photo, quantity, price]
    );

    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
            SELECT * 
            FROM products;
        
        
        `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProductById(productId) {
  if (!productId) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT *
    FROM products
    WHERE id = ${productId}
    `);
    return product;
  } catch (error) {
    console.error("Failed to get product by Id");
    throw error;
  }
}

async function getProductByName(name) {
  if (!name) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE name = $1
    `,
      [name]
    );
    return product;
  } catch (error) {
    console.error("Failed to get product by name");
    throw error;
  }
}



const updateProduct = async (id, fields = {}) => {
  const keys = Object.keys(fields);

  const setString = keys.map((key, index) => `"${key}"=$${index + 1}`);

  if (setString.length === 0) {
    return;
  }

  const {
    rows: [product],
  } = await client.query(
    `
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `,
    Object.values(fields)
  );

  return product;
};

async function destroyProduct(id) {
  try {
    const {
      rows: [removed],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *;
    
    
    `,
      [id]
    );
    return removed;
  } catch (error) {
    console.error("Error deleting products");
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  updateProduct,
  destroyProduct,
};
