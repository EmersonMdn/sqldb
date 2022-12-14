const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  thumbnail: { type: String, required: true },
});
const products = mongoose.model("products", productsSchema);

module.exports = products;
