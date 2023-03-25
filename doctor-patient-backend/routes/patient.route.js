const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
// const {
//     patientFormValidation
//   } = require("../validations/patient.validation");

const patientController = require("../modules/patient/patient.controller");



router.get("/getAllApprovedDoctors",patientController.getAllApprovedDoctors);
router.get("/getAllDisease",patientController.getAllDisease);
router.post("/patientForm",authenticated,patientController.patientForm);
router.get("/getAllDate",patientController.getAllDate);
router.get("/getTimeSlots",patientController.getTimeSlots);



module.exports = router;