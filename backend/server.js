const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const colors = require("colors");

// dotenv.config('./backend/config/.env');
dotenv.config({ path: "./backend/config/.env" });

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.listen(
  process.env.PORT,
  console.log(`Server running in  on port ${process.env.PORT}`.yellow.bold)
);
