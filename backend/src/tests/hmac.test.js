const { generateSignature } = require("../utils/hmac");

test("HMAC signature should match for same payload", () => {
  const secret = "testsecret";
  const payload = "POST/api/test123";

  const sig1 = generateSignature(secret, payload);
  const sig2 = generateSignature(secret, payload);

  expect(sig1).toBe(sig2);
});

// const crypto = require("crypto");
// exports.generateSignature = (secret, payload) => {
//   return crypto
//     .createHmac("sha256", Buffer.from(secret, "hex")) // 🔥 CRITICAL FIX
//     .update(payload)
//     .digest("hex");
// };

// const crypto = require("crypto");

// exports.generateSignature = (secret, payload) => {
//   const isHex = /^[0-9a-fA-F]{64}$/.test(secret); // 32 bytes in hex

//   const key = isHex
//     ? Buffer.from(secret, "hex") // real API secret
//     : Buffer.from(secret, "utf8"); // test strings

//   return crypto.createHmac("sha256", key).update(payload).digest("hex");
// };

// const crypto = require("crypto");

// exports.generateSignature = (secret, payload) => {
//   return crypto
//     .createHmac("sha256", secret) // ⬅ UTF-8 string (NOT Buffer.from hex)
//     .update(payload)
//     .digest("hex");
// };
