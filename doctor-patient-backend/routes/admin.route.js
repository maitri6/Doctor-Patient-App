const express = require("express");
const router = express.Router();
 const {
    updateStatusValidation
 } = require("../validations/admin.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",updateStatusValidation,adminController.updateStatus);
router.post("/getAllAdmins",adminController.getAllAdmins);
router.post("/getAllDoctors",adminController.getAllDoctors);
router.post("/getAllPatients",adminController.getAllPatients);
router.post("/AddAdmin",adminController.AddAdmin);




module.exports = router;
