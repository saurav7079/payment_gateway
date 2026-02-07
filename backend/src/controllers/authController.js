const User = require("../models/User");
const Merchant = require("../models/Merchant");
const jwt = require("jsonwebtoken");
const { generateApiKey, generateApiSecret } = require("../utils/keyGenerator");
const { encrypt } = require("../utils/encrypt");

exports.register = async (req, res) => {
  const { email, password, business_name } = req.body;

  const user = await User.create({ email, password_hash: password });

  const apiKey = generateApiKey();
  const apiSecret = generateApiSecret();

  await Merchant.create({
    user_id: user._id,
    business_name,
    api_key: apiKey,
    api_secret: encrypt(apiSecret),
  });

  res.json({ message: "Merchant registered", apiKey, apiSecret });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.json({ token });
};
