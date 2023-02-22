const express = require("express");
const router = express.Router();
 const {
    updateStatusValidation
 } = require("../validations/admin.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",updateStatusValidation,adminController.updateStatus);
router.post("/addAdmin",adminController.addAdmin);
router.get("/getAllDetails",adminController.getAllDetails);



module.exports = router;
