const express = require("express")
const productControllers = require("../controllers/productControllers")

const auth = require("../auth.js");

const router = express.Router();

// Create product routes

router.post("/", auth.verify, productControllers.createProduct);

// Retrieve all products routes
router.get("/allproducts", productControllers.getAllProducts);

// Retrieve all active products routes
router.get("/active", productControllers.getAllActiveProducts);

// Retrieve a single product route
router.get("/:id", productControllers.getSingleProducts);

// Update product information
router.patch("/:id/updateproduct", auth.verify, productControllers.updateProductInformation);

// Archive a product
router.patch("/:id/archivedproduct", auth.verify, productControllers.archiveProduct);


module.exports = router;