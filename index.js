// This is the Web Server
const express = require("express");
const server = express();
const session = require("express-session");
// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(cors());

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
server.use(express.json());

server.use((req, res, next) => {
  console.log("<__Body Logger START__>");
  console.log(req.body);
  console.log("<__Body Logger END__>");

  next();
});

server.use(
  session({
    secret: `${process.env.JWT_SECRET}`,
    resave: false,
    saveUnitialized: false,
  })
);

server.get("/", (req, res) => {
  console.log(req.session);
  console.log("The actual session id: ", req.sessionID);
  res.session.viewCount += 1;
  res.send(`View count at ${req.session.viewCount}`);
});

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./api"));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.send({ error: err.name, message: err.message, name: err.name });
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
