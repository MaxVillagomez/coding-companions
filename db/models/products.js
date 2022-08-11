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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
};
