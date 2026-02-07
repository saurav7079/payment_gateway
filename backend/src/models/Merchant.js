const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business_name: String,
  api_key: { type: String, unique: true },
  api_secret: String, // encrypted
  status: { type: String, default: "active" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Merchant", merchantSchema);
