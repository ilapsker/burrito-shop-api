const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

const api = require('../security/apiAuth');

router.get("/", orderController.listOrders);
router.get("/:orderId", orderController.getOrderById);
router.post("/", api.authenticateKey, orderController.submitOrder);

module.exports = router;