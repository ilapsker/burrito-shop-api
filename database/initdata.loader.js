const productModel = require("../model/product.model");
const allBurritos = require("../data/burritos.json");

// Populate burritoes product with init data if no data exists
exports.dbLoadInitData = async () => {
    const docCount = await productModel.countDocuments({});
        
    if (docCount === 0) {
        await productModel.create(allBurritos);
        console.log("Burritos product data loaded successfully");
    }
}
