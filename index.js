const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const session = require("express-session");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);

const db = "mongodb://localhost:27017/test";

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
