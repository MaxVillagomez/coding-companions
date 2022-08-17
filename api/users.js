const express = require("express");
const apiRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getUser, getUserById } = require("../db");
const { requireAdmin } = require("./utils");
const { JWT_SECRET = "hiddenSecret" } = process.env;

apiRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const _user = await getUserByEmail(email);
    if (_user) {
      res.status(401).send({
        error: "401",
        message: `Email ${email} is aleady taken.`,
        name: "EmailExistsError",
      });
    }
    const user = await createUser({ email, password });
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
    res.send({
      message: "Thank you for signing up!",
      token,
    });
  } catch (error) {
    console.error("Touble registering user.");
    throw error;
  }
});

apiRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({
      name: "MissingCredentialsError",
      message: "Please supply both a email and password",
    });
  }
  try {
    const user = await getUser(email, password);
    // const hashedPassword = user.password;
    // const isValid = await bcrypt.compare(password, hashedPassword);
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
    if (user) {
      res.send({
        user,
        message: "Welcome Back!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.error("Trouble logging in.");
    throw error;
  }
});

apiRouter.get("/me", async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    res.status(401).send({
      error: "UnauthorizedError",
      message: "You can't do this",
      name: "SomeError",
    });
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        res.send(req.user);
      }
    } catch (error) {
      console.error("Trouble getting me");
      throw error;
    }
  }
});

module.exports = apiRouter;
