const orderModel = require("../model/order.model");

exports.listOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({}); 
        res.status(200).json(allOrders);
    } catch (err) {
        //console.log("Unable listOrders " + err);
        res.status(500).json({message: "Unable to get list of orders"});
    }
}

exports.getOrderById = async (req, res) => {
    console.log("posting...");
    let orderId = "undefined";
    try {
        orderId = req.params.orderId;
        
        const order = await orderModel.findById(orderId); 
        if (order === null) {
            res.status(404).json({message: "No order found for id: " + orderId});
        }
        else {
            res.status(200).json(order);
        }                                       
    } catch (err) {
        //console.log("Unable getOrderById " + err);
        res.status(500).json({message: "Unable to get order details for id: " + orderId});
    }
}

exports.submitOrder = async (req, res, next) => {
    try {
        const newOrders = await orderModel.create(req.body); 
        res.status(201).json(newOrders);
    } catch (err) {
        //console.log("Unable submitOrder " + err);
        res.status(500).json({message: "Unable to submit order"});
    }
}