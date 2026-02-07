const Merchant = require("../models/Merchant");
const { decrypt } = require("../utils/encrypt");
const { generateSignature } = require("../utils/hmac");

module.exports = async (req, res, next) => {
  //  console.log("HEADERS RECEIVED:", req.headers);
  try {
    const apiKey = req.headers["x-api-key"];
    const signature = req.headers["x-signature"];
    const timestamp = req.headers["x-timestamp"];

    console.log("apiKey:", apiKey);
    console.log("timestamp:", timestamp);
    console.log("signature:", signature);

    if (!apiKey || !signature || !timestamp)
      return res.status(400).json({ error: "Missing auth headers" });

    // Prevent replay attacks (5 min window)
    if (Math.abs(Date.now() - timestamp) > 5 * 60 * 1000)
      return res.status(401).json({ error: "Request expired" });

    const merchant = await Merchant.findOne({ api_key: apiKey });
    // console.log("console merchent", merchant);

    if (!merchant) return res.status(401).json({ error: "Invalid API key" });

    const secret = decrypt(merchant.api_secret);

    const payload =
      req.method + req.originalUrl + JSON.stringify(req.body) + timestamp;

    // console.log("SERVER SECRET:", secret);
    // console.log("payload SECRET:", payload);

    const expectedSignature = generateSignature(secret, payload);

    // console.log("expected signature", expectedSignature);

    if (expectedSignature !== signature)
      return res.status(401).json({ error: "Invalid signature" });

    req.merchant = merchant;
    next();
  } catch (err) {
    res.status(500).json({ error: "Auth error" });
  }
};
