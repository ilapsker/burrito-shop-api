const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    totalCost: {
        type: Number,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        options: [String]
    }],
})

const orderModel =  mongoose.model.order|| mongoose.model('order', OrderSchema);

module.exports = orderModel;