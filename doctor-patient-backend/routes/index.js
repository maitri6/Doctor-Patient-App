const router = require("express").Router();
router.use("/auth", require("./auth.route"));
router.use("/doctor", require("./auth.route"));
module.exports = router;
