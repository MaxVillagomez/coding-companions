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
  updateProduct,
  destroyProduct,
  getCartOrderById,
  getCartOrderByUserId,
  getAllActiveCarts,
  getAllInactiveCarts,
  destroyIndividualCartItem,
  updateQuantityOfItem,

  // declare your model imports here
  // for example, User
} = require("./");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS categories;
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
          password VARCHAR(255) NOT NULL,
          street_address VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          zip INTEGER NOT NULL,
          is_admin BOOLEAN DEFAULT false
        );

        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          photo VARCHAR(255),
          quantity INTEGER,
          price NUMERIC(8, 2) NOT NULL
        );

         CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255),
          products_included VARCHAR(255)
         
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
      streetAddress: "4450 Main Street",
      city: "Bloomingdale",
      state: "Iowa",
      zip: "44356",
      isAdmin: true,
    });
    const austin = await createUser({
      email: "austin@austin.com",
      password: "password",
      streetAddress: "418 Jacoby Lane",
      city: "Rome",
      state: "Tennessee",
      zip: "33218",
      isAdmin: true,
    });
    const luke = await createUser({
      email: "luke@luke.com",
      password: "password",
      streetAddress: "308 Negra Arroya Lane",
      city: "Albuquerque",
      state: "New Mexico",
      zip: "61705",
      isAdmin: true,
    });
    const admin = await createUser({
      email: "admin",
      password: "admin",
      streetAddress: "Admin Lane",
      city: "Admin City",
      state: "New Admin",
      zip: "61705",
      isAdmin: true,
    });
    const demo = await createUser({
      email: "demo",
      password: "demo",
      streetAddress: "Demo St",
      city: "Demo city",
      state: "DM",
      zip: "09878",
      isAdmin: false
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
      quantity: 50,
      price: 14.99,
    });

    const product2 = await createProduct({
      name: "Wonder Woman Coding Companion",
      description:
        "The Amazonian Warrior will fight off any negative thoughts you have as an engineer!",
      photo:
        "https://media.gamestop.com/i/gamestop/11161780/Funko-POP-Heroes-Wonder-Woman-80th-Anniversary-Wonder-Woman-A-Twist-of-Fate-Vinyl-Figure",
      quantity: 25,
      price: 14.99,
    });

    const product3 = await createProduct({
      name: "Rocket Coding Companion",
      description:
        "This slippery little raccoon will show you the secrets to clean code!",
      photo:
        "https://cdn10.bigcommerce.com/s-8v6b4hr6ku/products/4637/images/14615/3__39221.1530986996.1280.1280.jpg?c=2",
      quantity: 100,
      price: 14.99,
    });

    const product4 = await createProduct({
      name: "Batman Coding Companion",
      description:
        "The Dark Knight will show you why he is not the hero Gotham's engineers deserve, but the hero they need.",
      photo:
        "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_6855.jpg",
      quantity: 75,
      price: 14.99,
    });
    const product5 = await createProduct({
      name: "The Flash Coding Companion",
      description:
        "Write your code in a flash! Your typing speed is guranteed to improve with this companion.",
      photo:
        "https://hotstuff4geeks.com/wp-content/uploads/2021/01/Funko-Pop-Television-The-Flash-Fastest-Man-Alive-The-Flash-Funko-Pop-Vinyl-Figure.jpg",
      quantity: 60,
      price: 14.99,
    });

    const product6 = await createProduct({
      name: "Joker Coding Companion",
      description: "Don't ask him why he's so serious about coding.",
      photo:
        "https://ae01.alicdn.com/kf/HTB1xdEcXF9gSKJjSspbq6zeNXXaq/FUNKO-POP-12cm-Joker-Batman-The-Dark-Knight-Villain-s-Edition-Animation-Action-Figure-PVC-Model.jpg",
      quantity: 10,
      price: 19.99,
    });

    const product7 = await createProduct({
      name: "Darth Vader Coding Companion",
      description:
        "Join the dark side of coding. Your powers will be multiplied.",
      photo:
        "https://d3nt9em9l1urz8.cloudfront.net/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/u/n/unnamed_2.jpg",
      quantity: 5,
      price: 19.99,
    });

    const product8 = await createProduct({
      name: "Dr. Octopus Coding Companion",
      description:
        "Dr. Otto Octavius himself is here to help you multi-task when coding. His extra arms will come in handy when browsing through your tabs.",
      photo:
        "https://cdn.awsli.com.br/800x800/848/848833/produto/52112114/3e9df7bc52.jpg",
      quantity: 7,
      price: 19.99,
    });

    const product9 = await createProduct({
      name: "Count Dooku Coding Companion",
      description:
        "His elegance on the field of battle will surely translate over to his new career of helping you write elegant code.",
      photo:
        "https://i5.walmartimages.com/asr/faa2e2fe-db2f-4d0c-a6b4-6d01c673968a_1.2bec88ecce06d91dc3136f7bd2245268.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
      quantity: 10,
      price: 19.99,
    });

    const product10 = await createProduct({
      name: "Deadpool Coding Companion",
      description:
        "Is he a hero or villain? I don't know but he looks cool. Will be 0 help to you while coding but he's got jokes.",
      photo:
        "https://legacycomics.com/wp-content/uploads/2020/04/POP-DEADPOOL-546.jpg",
      quantity: 20,
      price: 19.99,
    });
  } catch (error) {
    console.error("Error creating initial products");
    throw error;
  }
}

async function createInitialCategories() {
  try {
    console.log("Creating initial categories!");

    const category1 = await createCategory({
      name: "Heros",
      description: "Coding Companions of all your favorite heros!",
      productsIncluded: [
        "Super Man Coding Companion",
        "Wonder Woman Coding Companion",
      ],
    });

    const category2 = await createCategory({
      name: "Villains",
      description: "Coding Companions of all your mischevieous villains!",
      productsIncluded: ["Rocket Coding Companion"],
    });
    console.log("Finished creating initial categories!");
  } catch (error) {
    console.error("Error creating initial categories");
    throw error;
  }
}

// async function createInitialCartOrders() {
//   try {
//     const cart1 = await createCartOrder({
//       userId: 1,
//       active: true,
//     });
//     const cart2 = await createCartOrder({
//       userId: 2,
//       active: false,
//     });
//     const cart3 = await createCartOrder({
//       userId: 3,
//       active: true,
//     });
//   } catch (error) {
//     console.error("Error creating initial cart orders...");
//     throw error;
//   }
// }

// async function createInitialIndividualCartItem() {
//   try {
//     console.log("Creating intial items");
//     const item1 = await createIndividualCartItem({
//       productId: 1,
//       priceAtPurchase: 14.99,
//       cartId: 1,
//       quantity: 1,
//     });

//     // const item2 = await createIndividualCartItem({
//     //   productId: 2,
//     //   priceAtPurchase: 123456.99,
//     //   cartId: 1,
//     //   quantity: 2,
//     // });

//     const item3 = createIndividualCartItem({
//       productId: 3,
//       priceAtPurchase: 13.99,
//       cartId: 2,
//       quantity: 1,
//     });

//     const item4 = createIndividualCartItem({
//       productId: 3,
//       priceAtPurchase: 13.99,
//       cartId: 3,
//       quantitiy: 3,
//     });
//     console.log("Finished creating initial items");
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCategories();
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
    console.log("Get all Categories Result: ", categories);

    console.log("Calling get category by id");
    const categoryId = await getCategoryById(1);
    console.log("Get Category by Id Result: ", categoryId);

    console.log("Calling get category by name at Villains");
    const category2Name = await getCategoryByName("Villains");
    console.log("Get category by name result", category2Name);

    // console.log("Calling update Product at ID 3");
    // const update = await updateProduct(3, {
    //   name: "Updated rocket name",
    //   description: "Updated rocket description",
    //   quantity: 100,
    //   price: 99.99,
    // });
    // console.log("Updated Product Result", update);

    console.log("Calling delete product at ID 4");
    const remove = await destroyProduct(4);
    console.log("Delete result", remove);

  } catch (error) {
    console.error("Error testing database");
    throw error;
  }
}
