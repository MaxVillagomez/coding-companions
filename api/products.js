const express = require("express");
const apiRouter = express.Router();
const { getAllProducts, getProductById, getProductByName } = require("../db");

apiRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    throw error;
  }
});

// apiRouter.get("/:productId", async (req, res, next) => {
//   try {
//     const productId = await getProductById({ id: req.params.productId });
//     if (productId) {
//       res.send(productId);
//     } else {
//       next({
//         name: "NotFound",
//         message: `No Product found for ${req.params.productId}`,
//       });
//     }
//   } catch (error) {
//     console.error("Trouble getting product by Id");
//     throw error;
//   }
// });

apiRouter.get("/:productId", async (req, res, next) => {
  console.log("This is the params: ", req.params);
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);
    if (product) {
      res.send(product);
    } else {
      next({
        name: "NotFound",
        message: `No Product found for ${productId}`,
      });
    }
  } catch (error) {
    console.error("Trouble getting product by Id");
    throw error;
  }
});

module.exports = apiRouter;
