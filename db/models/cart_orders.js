// const client = require("../client");

// async function createCartOrder({ userId, active }) {
//   try {
//     const {
//       rows: [cart],
//     } = await client.query(
//       `
//         INSERT INTO cart_orders(user_id, active)
//         VALUES ($1, $2)
//         RETURNING *;
//         `,
//       [userId, active]
//     );
//     return cart;
//   } catch (error) {
//     console.error("Error creating cart order...");
//     throw error;
//   }
// }

// async function getAllCartOrders() {
//   try {
//     const { rows } = await client.query(`
//         SELECT * 
//         FROM cart_orders;
//         `);
//     return rows;
//   } catch (error) {
//     console.error("Error getting all cart orders...");
//     throw error;
//   }
// }

// async function getCartOrderById(id) {
//   if (!id) {
//     return;
//   }
//   try {
//     const {
//       rows: [cart],
//     } = await client.query(`
//             SELECT * 
//             FROM cart_orders
//             WHERE id=${id}
        
        
//         `);
//     return cart;
//   } catch (error) {
//     console.error("Error getting cart order by Id");
//     throw error;
//   }
// }

// async function getCartOrderByUserId(userId) {
//   if (!userId) {
//     return;
//   }

//   try {
//     const {
//       rows: [cart],
//     } = await client.query(`
//             SELECT * 
//             FROM cart_orders
//             WHERE user_id=${userId}
        
//         `);
//     return cart;
//   } catch (error) {
//     console.error("Error getting cart order by user id");
//     throw error;
//   }
// }

// async function getAllActiveCarts() {
//   try {
//     const { rows } = await client.query(`
//             SELECT * 
//             FROM cart_orders
//             WHERE active=true
        
        
//         `);
//     return rows;
//   } catch (error) {
//     console.error("Error getting all active carts");
//     throw error;
//   }
// }

// async function getAllInactiveCarts() {
//   try {
//     const { rows } = await client.query(`
//             SELECT * 
//             FROM cart_orders
//             WHERE active=false
        
        
//         `);
//     return rows;
//   } catch (error) {
//     console.error("Error getting all inactive carts");
//     throw error;
//   }
// }

// module.exports = {
//   createCartOrder,
//   getAllCartOrders,
//   getCartOrderById,
//   getCartOrderByUserId,
//   getAllActiveCarts,
//   getAllInactiveCarts,
// };
