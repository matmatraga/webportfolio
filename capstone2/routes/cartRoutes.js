const express = require("express")
const cartControllers = require("../controllers/cartControllers.js")


const router = express.Router();

router.post("/cart", cartControllers.addedProducts);

router.put("/cart/:id", cartControllers.changeProductQuantities);

router.delete("/cart/:id", cartControllers.removeProducts);

module.exports = router;