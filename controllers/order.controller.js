const orderModel = require("../model/order.model");

exports.listOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({}); 
        res.status(200).json(allOrders);
    } catch (err) {
        //console.log("Unable listOrders " + err);
        res.status(500).json("Unable to get list of orders");
    }
}

exports.submitOrder = async (req, res, next) => {

}