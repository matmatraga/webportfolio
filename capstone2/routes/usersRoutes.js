const express = require("express")
const usersControllers = require("../controllers/usersControllers");


const auth = require("../auth.js");

const router = express.Router();

// Registration
router.post("/register", usersControllers.registerUser);

// Login
router.get("/login", usersControllers.loginUser);

// Profile Details
router.get("/profile", auth.verify,usersControllers.getProfile)



module.exports = router;
