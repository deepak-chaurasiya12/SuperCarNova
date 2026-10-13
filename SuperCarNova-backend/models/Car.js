const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    year: {
      type: Number,
      required: true
    },

    mileage: {
      type: Number,
      default: 0,
      min: 0
    },

    fuel: {
      type: String,
      required: true,
      trim: true
    },

    transmission: {
      type: String,
      required: true,
      trim: true
    },

    engine: {
      type: String,
      trim: true
    },

    power: {
      type: String,
      trim: true
    },

    color: {
      type: String,
      trim: true
    },

    bodyType: {
      type: String,
      trim: true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0
    },

    description: {
      type: String,
      trim: true
    },

    // A URL or a path such as "/images/cars/fortuner.jpg"
    image: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes to keep filtering and sorting fast as the collection grows
carSchema.index({ brand: 1, price: 1 });
carSchema.index({ price: 1 });
carSchema.index({ rating: -1 });

module.exports = mongoose.model("Car", carSchema);