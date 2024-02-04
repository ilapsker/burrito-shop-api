const { restart } = require("nodemon");
const productModel = require("../model/product.model")

exports.listBurritoProducts = async (req, res) => {
    try {        
        const allProducts = await productModel.find({}); 
        res.status(200).json(allProducts);
    } catch (err) {
        //console.log("Unable listBurritoProducts " + err);
        res.status(500).json({message: "Unable to get list of burrito products"});
    }
}