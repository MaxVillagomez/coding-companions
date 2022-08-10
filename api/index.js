const apiRouter = require('express').Router();
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// const { Router } = require('express');
// place your routers here

const usersRouter = require("./users");
apiRouter.use('/users', usersRouter);

const productsRouter = require("./products");
const { Router } = require('express');
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
