const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const colors = require("colors");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");



// dotenv.config('./backend/config/.env');
dotenv.config({ path: "./backend/config/.env" });

// Bring all the router
const auth = require("./router/auth");
const product = require("./router/product");
const upload =  require("./router/upload");


const app = express();

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/products", product);
app.use("/api/v1/upload", upload);


app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Server running in  on port ${process.env.PORT}`.yellow.bold)
);
