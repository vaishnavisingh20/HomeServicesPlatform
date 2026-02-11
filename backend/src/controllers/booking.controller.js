const Booking = require("../models/Booking");
const Service = require("../models/Service");

// Create booking
const createBooking = async (req, res) => {
  try {
    const { customerName, customerPhone, address, serviceId, scheduledAt } = req.body;

    if (!customerName || !customerPhone || !address || !serviceId || !scheduledAt) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = await Booking.create({
      customerName,
      customerPhone,
      address,
      serviceId,
      scheduledAt,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("serviceId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};

module.exports = {
  createBooking,
  getBookingById,
};
