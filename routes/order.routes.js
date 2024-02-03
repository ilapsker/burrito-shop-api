const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.get("/", orderController.listOrders);

module.exports = router;