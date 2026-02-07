const Transaction = require("../models/Transaction");
const { generateSignature } = require("../utils/hmac");

exports.checkoutSession = async (req, res) => {
  const { amount, currency, customer_email, metadata } = req.body;

  const tx = await Transaction.create({
    merchant_id: req.merchant._id,
    amount,
    currency,
    customer_email,
    metadata,
    status: "pending",
  });

  res.json({ message: "Checkout session created", transactionId: tx._id });
};

exports.processPayment = async (req, res) => {
  const { transactionId } = req.body;

  const tx = await Transaction.findById(transactionId);
  if (!tx) return res.status(404).json({ error: "Transaction not found" });

  // Mock payment result
  tx.status = Math.random() > 0.2 ? "success" : "failed";

  await tx.save();

  res.json({ status: tx.status });
};

exports.webhook = async (req, res) => {
  const { transactionId, status } = req.body;

  await Transaction.findByIdAndUpdate(transactionId, { status });

  res.json({ received: true });
};

exports.history = async (req, res) => {
  const transactions = await Transaction.find()
    .sort({ created_at: -1 })
    .limit(50);

  res.json(transactions);
};
