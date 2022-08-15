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

apiRouter.get('./:productId', async(req, res, next) => {
    try {
        const productId = await getProductById({id: req.params.productId});
        if(productId) {
            res.send(productId);
        } else {
            next({
                name: 'NotFound',
                message: `No Product found for ${req.params.productId}`
            });
        }
    } catch (error) {
        console.error("Trouble getting product by Id");
        throw error;
    }
})

apiRouter

module.exports = apiRouter;