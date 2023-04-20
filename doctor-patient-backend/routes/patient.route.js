const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
// const {
//     patientFormValidation
//   } = require("../validations/patient.validation");

const patientController = require("../modules/patient/patient.controller");

router.get("/getAllApprovedDoctors/:disease",authenticated,patientController.getAllApprovedDoctors);
router.get("/getAllDiseases",authenticated,patientController.getAllDiseases);
router.post("/bookPatientAppointment",authenticated,patientController.patientForm);
router.get("/getAllAppointmentDates",authenticated,patientController.getAllDate);
router.get("/getAllAppointmentTimeSlots",authenticated,patientController.getTimeSlots);
router.get("/getPatientAppointment",authenticated,patientController.getPatientAppointment);

module.exports = router;