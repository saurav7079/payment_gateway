const router = require("express").Router();
const verifyMerchant = require("../middleware/verifyMerchant");
const authJWT = require("../middleware/authJWT");
const transactionController = require("../controllers/transactionController");
const validate = require("../middleware/validate");
const { checkoutSchema } = require("../validators/transactionValidator");

// 💳 PAYMENT APIs (HMAC signed)
router.post(
  "/checkout-session",
  verifyMerchant,
  transactionController.checkoutSession,
);

router.post(
  "/process-payment",
  verifyMerchant,
  transactionController.processPayment,
);
router.post("/webhook", verifyMerchant, transactionController.webhook);

// 📊 DASHBOARD API (JWT protected)
router.get("/history", authJWT, transactionController.history);

router.post(
  "/checkout-session",
  verifyMerchant,
  validate(checkoutSchema),
  transactionController.checkoutSession,
);

module.exports = router;
