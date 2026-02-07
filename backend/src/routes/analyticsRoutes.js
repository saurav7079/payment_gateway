const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const { stats } = require("../controllers/analyticsController");

router.get("/stats", authJWT, stats);

module.exports = router;
