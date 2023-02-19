const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
 const {
    updateStatusValidation
 } = require("../validations/admin.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",updateStatusValidation,adminController.updateStatus);
router.post("/getAllDoctors",adminController.getAllDoctors);




module.exports = router;
