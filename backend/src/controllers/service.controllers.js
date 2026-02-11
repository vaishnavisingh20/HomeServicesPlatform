const Service = require("../models/Service");

// GET all active services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

module.exports = {
  getAllServices,
};
