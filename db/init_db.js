const {
  client,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getUserById,
  getUserByEmail,
  // declare your model imports here
  // for example, User
} = require("./");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    
    `);
    console.log("Finished dropping tables");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables");
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          photo VARCHAR(255),
          price MONEY
        );

        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          "customerId" INTEGER REFERENCES users(id) NOT NULL,
          total MONEY NOT NULL,
          "productId" INTEGER REFERENCES products(id) NOT NULL
        );
    
    `);

    console.log("Finished creating tables");
  } catch (error) {
    console.error("Error creating tables");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Creating new users...");
    const max = await createUser({
      email: "maxvi@maxvi.com",
      password: "password",
    });
    const austin = await createUser({
      email: "austin@austin.com",
      password: "password",
    });
    const luke = await createUser({
      email: "luke@luke.com",
      password: "password",
    });
    console.log("Finished creating users...");
  } catch (error) {
    console.error("Error creating initial users");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Creating initial products...");

    const product1 = await createProduct({
      name: "Superman Coding Companion",
      description:
        "The hero of Metropolis is here to help manage your anger while you code!",
      photo: "www.supermanfunkopic.com",
      price: 12.99,
    });

    const product2 = await createProduct({
      name: "Stevie Wonder Coding Companion",
      description:
        "He may be blind, but the power of his music soothes even the most frustrated engineers.",
      photo: "www.somepicofsteviewonder.com",
      price: 14.99,
    });

    const product3 = await createProduct({
      name: "Sly Fox Coding Companion",
      description:
        "This slippery little animal will show you the secrets to clean code!",
      photo: "www.picturesoffox.com",
      price: 9.99,
    });
  } catch (error) {
    console.error("Error creating initial products");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

// async function populateInitialData() {
//   try {
//     // create useful starting data by leveraging your
//     // Model.method() adapters to seed your db, for example:
//     // const user1 = await User.createUser({ ...user info goes here... })
//   } catch (error) {
//     throw error;
//   }
// }

buildTables()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

async function testDB() {
  try {
    console.log("Starting to build test database");
    const users = await getAllUsers();
    console.log("This is all users: ", users);

    console.log("Starting to create initial products");
    const products = await getAllProducts();
    console.log("These are the initial products: ", products);

    console.log("Calling getUserById at 1");
    const max = await getUserById(1);
    console.log("Get User By Id Result: ", max);

    console.log("Calling getUserByEmail at maxvi@maxvi.com");
    const maxEmail = await getUserByEmail("maxvi@maxvi.com");
    console.log("Get User By Email Result: ", maxEmail);
  } catch (error) {
    console.error("Error testing database");
    throw error;
  }
}
