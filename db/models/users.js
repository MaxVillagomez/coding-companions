// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser({
  email,
  password,
  streetAddress,
  city,
  state,
  zip,
  isAdmin,
}) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(email, password, street_address, city, state, zip, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email;
    `,
      [email, hashedPassword, streetAddress, city, state, zip, isAdmin]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  try {
    const user = await getUserByEmail(email);
    // console.log("This is the user in DB", user);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      return;
    }
    delete user.password;
    return user;
  } catch (error) {
    console.log("Error getting user");
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

async function getUserById(userId) {
  if (!userId) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email, street_address, city, state, zip, is_admin
      FROM users
      WHERE id=${userId}
      
      `
    );
    return user;
  } catch (error) {
    console.error("Failed to get user by id");
    throw error;
  }
}

async function getUserByEmail(email) {
  if (!email) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    
    
    `,
      [email]
    );
    return user;
  } catch (error) {
    console.log("Failed to get user by email");
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUser,
};
