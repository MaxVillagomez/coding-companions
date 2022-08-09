const {
  client,
  createUser,
  getAllUsers
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
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          photoURL VARCHAR(255),
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
    console.log("Creating new users...")
    const max = await createUser({
      username: "maxvi",
      password: "password"
    });
    const austin = await createUser({
      username: "austin",
      password: "password"
    });
    const luke = await createUser({
      username: "luke",
      password: "password"
    });
    console.log("Finished creating users...");
  } catch (error) {
    console.error("Error creating initial users")
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

async function testDB () {
  try {
    console.log("Starting to build test database")
    const users = await getAllUsers();
    console.log("This is all users: ", users)
  } catch (error) {
    console.error("Error testing database")
    throw error;
  }
}