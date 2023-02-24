const express = require("express");
const router = express.Router();
const {authenticated} = require ("../middlewares/authenticated.middleware")
//  const {
//     updateStatusValidation
//  } = require("../validations/admin.validation");

const patientController = require("../modules/patient/patient.controller");



router.get("/getAllApprovedDoctors",patientController.getAllApprovedDoctors);
router.get("/getAllDieases",patientController.getAllDieases);
router.post("/patientForm",authenticated,patientController.patientForm);
router.get("/getAllDateAndTime",patientController.getAllDateAndTime);


module.exports = router;