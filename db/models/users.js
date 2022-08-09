// grab our db client connection to use with our adapters
const client = require("../client");

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM users;
    
    `);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};
