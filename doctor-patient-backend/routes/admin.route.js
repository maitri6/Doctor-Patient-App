const express = require("express");
const router = express.Router();
 const {
    updateStatusValidation
 } = require("../validations/admin.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",updateStatusValidation,adminController.updateStatus);
router.post("/getAllDoctors",adminController.getAllDoctors);
router.post("/AddAll",adminController.AddAll);




module.exports = router;
