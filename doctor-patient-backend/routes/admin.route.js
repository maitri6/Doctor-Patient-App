const express = require("express");
const {authenticated} = require ("../middlewares/authenticated.middleware")
const router = express.Router();
 const {
    updateStatusValidation
 } = require("../validations/admin.validation");

const adminController = require("../modules/admin/admin.controller");


router.post("/updateStatus",authenticated,updateStatusValidation,adminController.updateStatus);
router.post("/addAdmin",authenticated,adminController.addAdmin);
router.get("/getAllDetails",authenticated,adminController.getAllDetails);



module.exports = router;
