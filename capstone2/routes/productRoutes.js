const express = require("express")
const productControllers = require("../controllers/productControllers")

const auth = require("../auth.js");

const router = express.Router();

// Create product routes

router.post("/products", auth.verify, productControllers.createProduct);

// Retrieve all products routes
router.get("/products", productControllers.getAllProducts);

// Retrieve all active products routes
router.get("/products/active", productControllers.getAllActiveProducts);

// Retrieve a single product route
router.get("/products/:id", productControllers.getSingleProducts);

// Update product information
router.put("/products/:id", auth.verify, productControllers.updateProductInformation);

module.exports = router;