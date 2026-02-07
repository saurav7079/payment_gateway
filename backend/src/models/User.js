const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password_hash: String,
  role: { type: String, default: "merchant" },
  created_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password_hash")) return;
  this.password_hash = await bcrypt.hash(this.password_hash, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password_hash);
};

module.exports = mongoose.model("User", userSchema);
