const client = require('../client');

async function createCategory({name, description, productsIncluded }) {
    try {
        const {rows: [category]} = await client.query(`
        INSERT INTO categories(name, description, products_included)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, description, productsIncluded]);
        return category;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllCategories(){
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM categories;
        `);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createCategory,
    getAllCategories,
}