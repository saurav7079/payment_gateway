const Merchant = require("../models/Merchant");
const { generateApiKey, generateApiSecret } = require("../utils/keyGenerator");
const { encrypt } = require("../utils/encrypt");

exports.rotateKeys = async (req, res) => {
  try {
    const merchant = await Merchant.findOne({ user_id: req.user.id });

    if (!merchant) return res.status(404).json({ error: "Merchant not found" });

    const apiKey = generateApiKey();
    const apiSecret = generateApiSecret();

    merchant.api_key = apiKey;
    merchant.api_secret = encrypt(apiSecret);

    await merchant.save();

    res.json({ apiKey, apiSecret });
  } catch (err) {
    console.error("ROTATE ERROR:", err); // 👈 ADD THIS
    res.status(500).json({ error: "Key rotation failed" });
  }
};
