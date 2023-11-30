const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  seller: {
    type: String
  }
});

const Product = model("Product", ProductSchema);

module.exports = Product;