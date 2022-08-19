// const client = require("../client");
// const { getProductById } = require("./products");

// async function createIndividualCartItem({ productId, cartId, quantity }) {
//   try {
//     const { price } = await getProductById(productId);

//     const {
//       rows: [item],
//     } = await client.query(
//       `
//         INSERT INTO individual_cart_items(product_id, price_at_purchase, cart_id, quantity)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//         `,
//       [productId, price, cartId, quantity]
//     );
//     return item;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function getAllIndividualCartItems() {
//   try {
//     const { rows } = await client.query(`
//         SELECT *
//         FROM individual_cart_items;
//         `);
//     return rows;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function getIndividualCartById(id) {
//   if (!id) {
//     return;
//   }
//   try {
//     const {
//       rows: [cart],
//     } = await client.query(`
//         SELECT *
//         FROM individual_cart_items
//         WHERE id = ${id}
//         `);
//     return cart;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function getIndividualCartByCartId(cartId) {
//   if (!cartId) {
//     return;
//   }
//   try {
//     const {
//       rows: [cart],
//     } = await client.query(`
//         SELECT *
//         FROM individual_cart_items
//         WHERE cart_id=${cartId}
//         `);
//     return cart;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function updateQuantityOfItem(id, quantitiy) {
//   try {
//     const {
//       rows: [item],
//     } = await client.query(
//       `
//             UPDATE individual_cart_items
//             SET quantity=$2
//             WHERE id=$1
//             RETURNING *;
        
//         `,
//       [id, quantitiy]
//     );
//     return item;
//   } catch (error) {
//     console.error("Error updating the quantity of the cart item");
//     throw error;
//   }
// }

// async function destroyIndividualCartItem(id) {
//   try {
//     const {
//       rows: [removed],
//     } = await client.query(
//       `
//             DELETE FROM individual_cart_items
//             WHERE id=$1
//             RETURNING *;
        
//         `,
//       [id]
//     );
//     return removed;
//   } catch (error) {
//     console.error("Error deleting individual cart item");
//     throw error;
//   }
// }

// module.exports = {
//   createIndividualCartItem,
//   getAllIndividualCartItems,
//   getIndividualCartById,
//   getIndividualCartByCartId,
//   destroyIndividualCartItem,
//   updateQuantityOfItem,
// };
