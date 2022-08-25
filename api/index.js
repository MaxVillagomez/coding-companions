const apiRouter = require("express").Router();
const cors = require("cors");
apiRouter.use(cors());
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

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
      const userToken = jwt.verify(token, JWT_SECRET);
      const id = userToken && userToken.id;
      console.log("this is api index id: ", id);
      if (!id) {
        res.status(401);
        next({
          name: "AuthorizationHeaderError",
          message: `Authorization token must start with ${prefix}`,
        });
      } else {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set: ", req.user);
  }
  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");
const { Router } = require("express");
apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
