const express = require("express")
const cartControllers = require("../controllers/cartControllers.js")


const router = express.Router();

router.post("/cart", cartControllers.addedProducts);

router.put("/cart/:id", cartControllers.changeProductQuantities);

router.delete("/cart/:id/removecart", cartControllers.removeCart);

router.get("/cart/:id/subtotal", cartControllers.subTotals);

router.get("/cart/:id/total", cartControllers.totalPrice);

module.exports = router;