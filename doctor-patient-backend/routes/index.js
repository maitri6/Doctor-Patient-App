const router = require("express").Router();
router.use("/auth", require("./auth.route"));
router.use("/doctor", require("./doctor.route"));
router.use("/admin", require("./admin.route"));
module.exports = router;
