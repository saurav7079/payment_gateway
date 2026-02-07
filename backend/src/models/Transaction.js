const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  merchant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Merchant" },
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, default: "pending" },
  customer_email: String,
  metadata: Object,
  signature: String,
  created_at: { type: Date, default: Date.now },
});

// Indexes for performance
transactionSchema.index({ merchant_id: 1, created_at: -1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
