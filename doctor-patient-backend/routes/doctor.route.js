const express = require("express");
const router = express.Router();
const {
    doctorValidation
} = require("../validations/doctor.validation");

const doctorController = require("../modules/doctor/doctor.controller");


router.post("/saveDoctorDetails",  doctorValidation,doctorController.doctorForm);
router.get("/getAllCities",doctorController.getAllCities);

module.exports = router;
