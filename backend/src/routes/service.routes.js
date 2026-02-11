const express = require("express");
const router = express.Router();
const { getAllServices } = require("../controllers/service.controllers");

// GET /api/services
router.get("/", getAllServices);

module.exports = router;
