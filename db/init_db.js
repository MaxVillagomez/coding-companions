const {
  client,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getUserById,
  getUserByEmail,
  getProductById,
  getProductByName,
  createCategory,
  getAllCategories,
  createIndividualCartItem,
  getAllIndividualCartItems,
  createCartOrder,
  getAllCartOrders,
  getCategoryById,
  getCategoryByName,
  getIndividualCartById,
  getIndividualCartByCartId,

  // declare your model imports here
  // for example, User
} = require("./");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS individual_cart_items;
    DROP TABLE IF EXISTS cart_orders;
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
          quantity INTEGER,
          price NUMERIC(8, 2) NOT NULL
        );
  
        CREATE TABLE cart_orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          active BOOLEAN DEFAULT true
         );


         CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255),
          products_included INTEGER REFERENCES products(id)
        );
  
        CREATE TABLE individual_cart_items (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          price_at_purchase NUMERIC(8,2), 
          cart_id INTEGER REFERENCES cart_orders(id),
          quantity INTEGER
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
      photo: "https://m.media-amazon.com/images/I/617cdhho1iL._AC_SY606_.jpg",
      quantity: 5,
      price: 14.99,
    });

    const product2 = await createProduct({
      name: "Wonder Woman Coding Companion",
      description:
        "He may be blind, but the power of his music soothes even the most frustrated engineers.",
      photo:
        "https://media.gamestop.com/i/gamestop/11161780/Funko-POP-Heroes-Wonder-Woman-80th-Anniversary-Wonder-Woman-A-Twist-of-Fate-Vinyl-Figure",
      quantity: 13,
      price: 123456.99,
    });

    const product3 = await createProduct({
      name: "Rocket Coding Companion",
      description:
        "This slippery little animal will show you the secrets to clean code!",
      photo: "https://m.media-amazon.com/images/I/619b8I+RK5L._AC_SY550_.jpg",
      quantity: 2,
      price: 13.99,
    });
  } catch (error) {
    console.error("Error creating initial products");
    throw error;
  }
}

async function createInitialCategories(){
  try {
    console.log("Creating initial categories!")
    
    const category1 = await createCategory({
      name: "Heros",
      description: "Coding Companions of all your favorite heros!",
      productsIncluded: 1
    });

    const category2 = await createCategory({
      name: "Villains",
      description: "Coding Companions of all your mischevieous villains!",
      productsIncluded: 3
    });
    console.log("Finished creating initial categories!");
  } catch (error) {
    console.error("Error creating initial categories");
    throw error;
  }
}

async function createInitialCartOrders(){
  try {
    const cart1 = await createCartOrder({
      userId: 1,
      active: true
    });
    const cart2 = await createCartOrder({
      userId: 2,
      active: false
    });
    const cart3 = await createCartOrder({
      userId: 3,
      active: true
    });
  } catch (error) {
    console.error("Error creating initial cart orders...");
    throw error;
  }
}

async function createInitialIndividualCartItem(){
  try {
    console.log("Creating intial items");
    const item1 = await createIndividualCartItem({
      productId: 1,
      priceAtPurchase: 14.99,
      cartId: 1,
      quantity: 1
    });
    
    const item2 = await createIndividualCartItem({
      productId: 2,
      priceAtPurchase: 123456.99,
      cartId: 1,
      quantity: 2
    });

    const item3 = createIndividualCartItem({
      productId: 3,
      priceAtPurchase: 13.99,
      cartId: 2,
      quantity: 1
    });
    console.log("Finished creating initial items")
  } catch (error) {
    console.error(error);
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
    await createInitialCategories();
    await createInitialCartOrders();
    await createInitialIndividualCartItem();
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

    console.log("Calling get product by Id at 1");
    const product1 = await getProductById(1);
    console.log("Get Product by Id Result: ", product1);

    console.log("Calling getProductByName at Wonder Woman Coding Comapnion");
    const product2 = await getProductByName("Wonder Woman Coding Companion");
    console.log("Get Product By Name Result: ", product2);

    console.log("Calling get all Categories");
    const categories = await getAllCategories();
    console.log("Get all Categories Result: ", categories );

    console.log("Calling all cart orders");
    const cart = await getAllCartOrders();
    console.log("Get all Cart Orders Result: ", cart);

    console.log("Calling all Individual Items");
    const item = await getAllIndividualCartItems();
    console.log("Get all Individual Items Result: ", item);

    console.log("Calling get category by id");
    const categoryId = await getCategoryById(1);
    console.log("Get Category by Id Result: ", categoryId);

    console.log("Calling get category by name at Villains");
    const category2Name = await getCategoryByName("Villains");
    console.log("Get category by name result", category2Name);

    console.log("Calling get Individual Cart by Id at 1");
    const idCart = await getIndividualCartById(1);
    console.log("Get Individual Cart by Id Result: ", idCart);

    console.log("Calling get Individual Cart by Cart Id at 1");
    const cartId1 = await getIndividualCartByCartId(2);
    console.log("Get Individual Cart by Cart Id Result: ", cartId1);
    
  } catch (error) {
    console.error("Error testing database");
    throw error;
  }
}
