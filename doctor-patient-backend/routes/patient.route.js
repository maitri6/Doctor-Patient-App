const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
// const {
//     patientFormValidation
//   } = require("../validations/patient.validation");

const patientController = require("../modules/patient/patient.controller");

router.get("/getAllApprovedDoctors/:disease",authenticated,patientController.getAllApprovedDoctors);
router.get("/getAllDiseases",authenticated,patientController.getAllDiseases);
router.post("/patientForm",authenticated,patientController.patientForm);
router.get("/getAllDate",authenticated,patientController.getAllDate);
router.get("/getTimeSlots",authenticated,patientController.getTimeSlots);

module.exports = router;