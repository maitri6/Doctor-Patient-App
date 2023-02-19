const router = require("express").Router();
router.use("/auth", require("./auth.route"));
router.use("/doctor", require("./doctor.route"));
router.use("/", require("./upload.route"));
router.use("/admin", require("./admin.route"));
module.exports = router;
