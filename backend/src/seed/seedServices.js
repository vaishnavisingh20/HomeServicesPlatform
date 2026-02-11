require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Service = require("../models/Service");

const seedServices = async () => {
  try {
    await connectDB();

    await Service.deleteMany(); // clear old data

    await Service.insertMany([
      {
        title: "AC Repair",
        category: "Appliance Repair",
        description: "Professional AC servicing and repair.",
        basePrice: 599,
        durationMins: 60,
      },
      {
        title: "Salon at Home",
        category: "Beauty",
        description: "Home salon services for women.",
        basePrice: 999,
        durationMins: 90,
      },
      {
        title: "Plumber Service",
        category: "Home Maintenance",
        description: "Fix leaks and plumbing issues.",
        basePrice: 399,
        durationMins: 45,
      },
      {
        title: "Electrician Service",
        category: "Home Maintenance",
        description: "Electrical repairs and installations.",
        basePrice: 499,
        durationMins: 60,
      },
      {
        title: "Bathroom Cleaning",
        category: "Cleaning",
        description: "Deep cleaning for bathrooms.",
        basePrice: 799,
        durationMins: 120,
      }
    ]);

    console.log("Services seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedServices();
