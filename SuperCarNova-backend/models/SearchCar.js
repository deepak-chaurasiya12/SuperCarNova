const mongoose = require("mongoose");

const searchCarSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      trim: true
    },

    model: {
      type: String,
      trim: true
    },

    minPrice: {
      type: Number
    },

    maxPrice: {
      type: Number
    },

    fuelType: {
      type: String,
      trim: true
    },

    transmission: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("SearchCar", searchCarSchema);