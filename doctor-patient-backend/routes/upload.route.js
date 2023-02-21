const express = require("express");
const router = express.Router();
const uploadController = require("../modules/upload/upload.controller.js");

router.post("/uploadImage", uploadController.uploadImage);

module.exports = router;