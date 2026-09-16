const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquirycontroller");

// POST
router.post("/", enquiryController.createEnquiry);

// GET
router.get("/", enquiryController.getEnquiries);

module.exports = router;