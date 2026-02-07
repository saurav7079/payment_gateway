const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const merchantRoutes = require("./routes/merchantRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Body parser
app.use(express.json());

// Prevent NoSQL Injection
app.use(mongoSanitize());

// Rate limit auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts",
});
app.use("/api/auth", authLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/merchant", merchantRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => res.send("Payment Gateway API Running"));

module.exports = app;
