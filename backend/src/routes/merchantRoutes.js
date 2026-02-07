const router = require("express").Router();
const authJWT = require("../middleware/authJWT");
const { rotateKeys } = require("../controllers/merchantController");

router.post("/rotate-keys", authJWT, rotateKeys);

module.exports = router;
