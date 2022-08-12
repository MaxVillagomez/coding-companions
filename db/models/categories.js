const client = require("../client");

async function createCategory({ name, description, productsIncluded }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        INSERT INTO categories(name, description, products_included)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [name, description, productsIncluded]
    );
    return category;
  } catch (error) {
    console.error("Failed to create category...");
    throw error;
  }
}

async function getAllCategories() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM categories;
        `);
    return rows;
  } catch (error) {
    console.error("Failed to get all categories...");
    throw error;
  }
}

async function getCategoryById(categoryId) {
  if (!categoryId) {
    return;
  }
  try {
    const {
      rows: [category],
    } = await client.query(`
        SELECT *
        FROM categories
        WHERE id = ${categoryId}
        `);
    return category;
  } catch (error) {
    console.error("Failed to get category by id");
    throw error;
  }
}

async function getCategoryByName(name) {
  if (!name) {
    return;
  }
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        SELECT *
        FROM categories
        WHERE name = $1
        `,
      [name]
    );
    return category;
  } catch (error) {
    console.error("Failed to get category by name");
    throw error;
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
};
