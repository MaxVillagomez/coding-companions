const express = require('express');
const apiRouter = express.Router();
const {getAllProducts, getProductById, getProductByName} = require('../db');

apiRouter.get('/', async (req, res, next) =>{
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        throw error;
    }
});

module.exports = apiRouter;