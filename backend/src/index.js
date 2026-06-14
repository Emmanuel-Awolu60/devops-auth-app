require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDB } = require("./db");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start
const start = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
