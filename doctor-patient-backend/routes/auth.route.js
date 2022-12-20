const express = require("express");
const router = express.Router();
const {
registerValidation,
loginValidation
   }= require("../validations/auth.validation");
const authController = require("../modules/userAuth/auth.controller");

router.post("/register",registerValidation, authController.register);
router.post("/login",loginValidation, authController.login);

module.exports = router;
