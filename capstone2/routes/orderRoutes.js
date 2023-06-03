const express = require("express")
const orderControllers = require("../controllers/orderControllers.js")


const router = express.Router();

router.post("/orders", orderControllers.createOrder);


module.exports = router;