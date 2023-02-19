const router = require("express").Router();
router.use("/auth", require("./auth.route"));
router.use("/doctor", require("./doctor.route"));
<<<<<<< HEAD
router.use("/", require("./upload.route"));
module.exports = router;
=======
router.use("/admin", require("./admin.route"));
module.exports = router;
>>>>>>> 7b80f66c1f0a077af7e6f4d72b22921e50a6a823
