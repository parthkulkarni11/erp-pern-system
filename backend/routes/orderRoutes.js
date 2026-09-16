const router = require("express").Router();
const { convertToOrder } = require("../controllers/orderController");

router.post("/convert/:id", convertToOrder);

module.exports = router;