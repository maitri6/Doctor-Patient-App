const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
const {
    doctorValidation
} = require("../validations/doctor.validation");

const doctorController = require("../modules/doctor/doctor.controller");


router.post("/saveDoctorDetails",  doctorValidation,doctorController.doctorForm);
router.get("/getAllCities",doctorController.getCityAndYear);
router.get("/getDoctorAndPatientDetails",doctorController.getDoctorAndPatientDetails);
router.get("/getAllAppointments",authenticated,doctorController.getAllAppointments);
router.post("/updateProfile",authenticated,doctorController.updateProfile);
router.put("/updatePatientStatus",doctorController.updatePatientStatus);

module.exports = router;
