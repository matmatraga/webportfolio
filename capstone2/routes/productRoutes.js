const express = require("express")
const productControllers = require("../controllers/productControllers")

const auth = require("../auth.js");

const router = express.Router();

// Create product routes

router.post("/products", auth.verify, productControllers.createProduct);

// Retrieve all products routes
router.get("/products/allproducts", productControllers.getAllProducts);

// Retrieve all active products routes
router.get("/products/active", productControllers.getAllActiveProducts);

// Retrieve a single product route
router.get("/products/:id", productControllers.getSingleProducts);

// Update product information
router.put("/products/:id/updateproduct", auth.verify, productControllers.updateProductInformation);

// Archive a product
router.delete("/products/:id/archivedproduct", auth.verify, productControllers.archiveProduct);


module.exports = router;