const express = require('express');
const apiRouter = express.Router();
const { getAllCartOrders } = require('../db');

apiRouter.get('/', async(req, res, next) => {
    try {
        const cartOrders = await getAllCartOrders();
        res.send(cartOrders);
    } catch (error) {
        console.log("Trouble getting cart orders")
        throw error;
    }
})

module.exports = apiRouter