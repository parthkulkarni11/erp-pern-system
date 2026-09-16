const express = require("express");
const router = express.Router();
const controller = require("../controllers/quotationController");

router.post("/", controller.createQuotation);
router.get("/", controller.getQuotations);
router.get("/:id", controller.getQuotationById);

module.exports = router;