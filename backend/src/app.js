const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const bookingRoutes = require("./routes/booking.routes");
const serviceRoutes = require("./routes/service.routes");


const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
module.exports = app;
