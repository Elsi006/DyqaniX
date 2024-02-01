const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  product: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  barcode: {
    type: Number,
  },
  priceofsell: {
    type: Number,
  },
  newQuanity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductSchema], // Array of products
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
