const client = require("../client");

async function createProduct({ name, description, photo, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, description, photo, price)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
      [name, description, photo, price]
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

module.exports = {
  createProduct,
  getAllProducts,
};
