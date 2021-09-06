const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const session = require("express-session");

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:3000/",
  "http://localhost:3001/",
  "https://uberchat2021.herokuapp.com/",
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const connectDB = require("./config/db");
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
