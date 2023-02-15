const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
// const {
//     doctorValidation
// } = require("../validations/doctor.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",adminController.updateStatus);


module.exports = router;
