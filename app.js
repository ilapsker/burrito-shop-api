const express = require('express');
const productRoutes = require("./routes/product.routes.js");
const orderRoutes = require("./routes/order.routes.js");

const app = express();
app.use(express.json());

app.use("/api/burrito", productRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;