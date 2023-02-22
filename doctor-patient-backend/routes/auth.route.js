const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
const {
    registerValidation,
    loginValidation,
    forgetValidation,
    changePasswordValidation,
    updateProfileValidation
} = require("../validations/auth.validation");
const authController = require("../modules/userAuth/auth.controller");
router.get("/getUserById",authenticated,authController.getUserById);
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/forgetPassword",forgetValidation, authController.forgetPassword);
router.post("/resetPassword", authController.resetPassword);
router.post("/sendOtp", authController.sendOtp);
router.post("/updateProfile",updateProfileValidation,authenticated,authController.updateProfile);
router.post("/changePassword",changePasswordValidation,authenticated,authController.changePassword);




module.exports = router;