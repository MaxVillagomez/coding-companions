// grab our db client connection to use with our adapters
const client = require("../client");

async function createUser({email, password}) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users(email, password)
    VALUES ($1, $2)
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email;
    `, [email, password])
    return user;
  } catch (error) {
    throw error;
  }
}
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
  createUser,
  getAllUsers
};
