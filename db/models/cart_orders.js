const client = require('../client');

async function createCartOrder({userId, active}) {
    try {
        const {rows: [cart]} = await client.query(`
        INSERT INTO cart_orders(user_id, active)
        VALUES ($1, $2)
        RETURNING *;
        `, [userId, active]); 
        return cart;
    } catch (error) {
        console.error("Error creating cart order...");
        throw error;
    }
}

async function getAllCartOrders() {
    try {
        const {rows} = await client.query(`
        SELECT * 
        FROM cart_orders;
        `);
        return rows;
    } catch (error) {
       console.error("Error getting all cart orders...");
       throw error; 
    }
}

module.exports = {
    createCartOrder,
    getAllCartOrders
}