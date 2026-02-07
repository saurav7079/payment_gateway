const crypto = require("crypto");

exports.generateSignature = (secret, payload) => {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
};
