const express = require("express")
const cartControllers = require("../controllers/cartControllers.js")


const router = express.Router();

router.post("/cart", cartControllers.addedProducts);

router.put("/cart/products:_id", cartControllers.changeProductQuantities);
module.exports = router;