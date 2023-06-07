const express = require("express")
const orderControllers = require("../controllers/orderControllers.js")
const auth = require("../auth.js");

const router = express.Router();

// Creating order
router.post("/orders", orderControllers.createOrder);

// Retrieve all orders (Admin Only)
router.get("/orders/allorders", auth.verify, orderControllers.getAllOrders);

// Retrieving authenticated user's orders route
router.get("/orders/authenticatedorder", orderControllers.getAuthenticatedUserOrders);





module.exports = router;