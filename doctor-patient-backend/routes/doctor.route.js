const express = require("express");
const router = express.Router();

const authController = require("../modules/doctor/doctor.controller");


router.post("/saveDoctorDetails", authController.doctorForm);

module.exports = router;
