const Transaction = require("../models/Transaction");

exports.stats = async (req, res) => {
  const totalVolume = await Transaction.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const successRate = await Transaction.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.json({ totalVolume, successRate });
};
