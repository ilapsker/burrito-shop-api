const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sizeToPrice: {
        type: Map,
        of: Number,
        required: true
      },
      options: [String]
})

const productModel =  mongoose.model.product || mongoose.model('product', ProductSchema);

module.exports = productModel;