const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      public_id: { type:String, },
      url: { type:String, },
    },
  ],
  reviews: [
    {
      user: { type: Object, },
      rating: { type: Number, },
      comment: { type: String, },
      productId: { type: String, },
      createdAt:{ type: Date,  default: Date.now(), }
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  brandId: {
    type: String,
    required: true,
  },
  brand: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  eventId: {
    type: String,
  },
  event: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);