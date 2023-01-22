const express = require("express");
const router = express.Router();
const {
    doctorValidation
} = require("../validations/doctor.validation");

const authController = require("../modules/doctor/doctor.controller");


router.post("/saveDoctorDetails",  doctorValidation,authController.doctorForm);

module.exports = router;
