const crypto = require("crypto");

exports.generateApiKey = () => "pk_" + crypto.randomBytes(16).toString("hex");

exports.generateApiSecret = () => crypto.randomBytes(32).toString("hex");
