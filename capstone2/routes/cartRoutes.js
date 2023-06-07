const express = require("express")
const cartControllers = require("../controllers/cartControllers.js")


const router = express.Router();

router.post("/cart", cartControllers.addedProducts);

router.put("/cart/quantity", cartControllers.changeProductQuantities);

router.delete("/cart/:id/removecart", cartControllers.removeCart);

router.get("/cart/subtotal", cartControllers.subTotals);

router.get("/cart/total", cartControllers.totalPrice);

module.exports = router;