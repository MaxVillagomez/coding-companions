const express = require("express");
const apiRouter = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductByName,
  updateProduct,
  destroyProduct,
  createProduct,
} = require("../db");
const { requireAdmin } = require("./utils");

apiRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    throw error;
  }
});

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

apiRouter.post("/", requireAdmin, async (req, res, next) => {
  const { name, description, photo, quantity, price } = req.body;
  console.log("Yeeeeeee ", req.user);
  try {
    const product = await createProduct({
      name,
      description,
      photo,
      quantity,
      price,
    });
    res.send(product);
  } catch (error) {
    console.error("Trouble creating new product");
    throw error;
  }
});

apiRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  console.log("this is the req params", req.params);
  const { name, description, photo, quantity, price } = req.body;

  try {
    const product = await getProductById(productId);
    console.log("this is the product", product);

    const updatedProduct = await updateProduct(productId, {
      name,
      description,
      photo,
      quantity,
      price,
    });
    console.log("This is the updatedProduct: ", updatedProduct);
    res.send(updatedProduct);
  } catch (error) {
    console.error("Trouble patching product");
    throw error;
  }
});

apiRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    const remove = await destroyProduct(productId);

    res.send(remove);
  } catch (error) {
    console.error("Trouble deleting product");
    throw error;
  }
});

module.exports = apiRouter;
