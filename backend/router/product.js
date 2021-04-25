const express = require("express");
const { createProduct, getProductById ,getProducts, updateProduct , deleteProduct, getProductsByUserID} = require("../controllers/product");
const router = express.Router();

const {protect, admin} = require('../middleware/auth');

router.route("/").post(protect, createProduct).get(getProducts);

router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct)
router.route("/:userID/all").get(getProductsByUserID);


module.exports = router;
