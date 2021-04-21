const express = require("express");
const { createProduct, getProductById ,getProducts, updateProduct , deleteProduct} = require("../controllers/product");
const router = express.Router();

const {protect, admin} = require('../middleware/auth');

router.route("/").post(protect, createProduct).get(getProducts);

router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct)


module.exports = router;
