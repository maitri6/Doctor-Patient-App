const express = require("express");
const router = express.Router();
//  const {
//     updateStatusValidation
//  } = require("../validations/admin.validation");

const patientController = require("../modules/patient/patient.controller");



router.get("/getAllApprovedDoctors",patientController.getAllApprovedDoctors);
router.get("/getAllDieases",patientController.getAllDieases);
router.post("/patientForm",patientController.patientForm);

module.exports = router;