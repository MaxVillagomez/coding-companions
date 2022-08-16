const apiRouter = require("express").Router();
const cors = require("cors");
apiRouter.use(cors());
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "hiddenSecret" } = process.env;

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.send({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
    next();
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set: ", req.user);
  }
  next();
});

// const { Router } = require('express');
// place your routers here

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");
const { Router } = require("express");
apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
