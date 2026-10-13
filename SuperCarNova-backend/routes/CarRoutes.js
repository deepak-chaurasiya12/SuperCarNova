const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Car = require("../models/Car");

/* -------------------------------------------------
   Helpers
   ------------------------------------------------- */

// Escape user input before using it inside a RegExp
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// "Toyota, Honda" or ["Toyota", "Honda"] -> ["Toyota", "Honda"]
const toList = (value) =>
  String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

// Case-insensitive exact match against any value in a list
const matchAny = (value) => ({
  $in: toList(value).map((item) => new RegExp(`^${escapeRegex(item)}$`, "i"))
});

// Build { $gte, $lte } only for values that are valid numbers
const numberRange = (min, max) => {
  const range = {};

  if (min !== undefined && min !== "" && !isNaN(min)) range.$gte = Number(min);
  if (max !== undefined && max !== "" && !isNaN(max)) range.$lte = Number(max);

  return Object.keys(range).length ? range : null;
};

// Only these sort options are allowed
const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  "year-desc": { year: -1 },
  "rating-desc": { rating: -1 },
  "mileage-asc": { mileage: 1 }
};

/* -------------------------------------------------
   GET /api/cars
   Query params (all optional):
   search, brand, fuel, transmission, bodyType, color,
   minPrice, maxPrice, minYear, maxYear, maxMileage,
   sort, page, limit
   ------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const {
      search,
      brand,
      fuel,
      transmission,
      bodyType,
      color,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      maxMileage,
      sort = "newest",
      page = 1,
      limit = 12
    } = req.query;

    const filter = {};

    // Text search: every word must match brand, model or body type
    if (search && String(search).trim()) {
      const words = String(search).trim().split(/\s+/);

      filter.$and = words.map((word) => {
        const regex = new RegExp(escapeRegex(word), "i");
        return {
          $or: [{ brand: regex }, { model: regex }, { bodyType: regex }]
        };
      });
    }

    if (brand) filter.brand = matchAny(brand);
    if (fuel) filter.fuel = matchAny(fuel);
    if (transmission) filter.transmission = matchAny(transmission);
    if (bodyType) filter.bodyType = matchAny(bodyType);
    if (color) filter.color = matchAny(color);

    const priceRange = numberRange(minPrice, maxPrice);
    if (priceRange) filter.price = priceRange;

    const yearRange = numberRange(minYear, maxYear);
    if (yearRange) filter.year = yearRange;

    const mileageRange = numberRange(undefined, maxMileage);
    if (mileageRange) filter.mileage = mileageRange;

    // Sorting (_id is a tie-breaker so pagination stays stable)
    const sortBy = { ...(SORT_OPTIONS[sort] || SORT_OPTIONS.newest), _id: 1 };

    // Pagination
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);

    const [total, cars] = await Promise.all([
      Car.countDocuments(filter),
      Car.find(filter)
        .sort(sortBy)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .lean()
    ]);

    res.status(200).json({
      success: true,
      total,
      count: cars.length,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message
    });
  }
});

/* -------------------------------------------------
   GET /api/cars/filters
   Returns the values for filter dropdowns, built from
   the real data in the database.
   NOTE: must stay above "/:id" or "filters" is treated as an id.
   ------------------------------------------------- */
router.get("/filters", async (req, res) => {
  try {
    const [brands, fuels, transmissions, bodyTypes, colors, priceStats] =
      await Promise.all([
        Car.distinct("brand"),
        Car.distinct("fuel"),
        Car.distinct("transmission"),
        Car.distinct("bodyType"),
        Car.distinct("color"),
        Car.aggregate([
          {
            $group: {
              _id: null,
              minPrice: { $min: "$price" },
              maxPrice: { $max: "$price" }
            }
          }
        ])
      ]);

    const sortText = (list) => list.filter(Boolean).sort((a, b) => a.localeCompare(b));

    res.status(200).json({
      success: true,
      data: {
        brands: sortText(brands),
        fuels: sortText(fuels),
        transmissions: sortText(transmissions),
        bodyTypes: sortText(bodyTypes),
        colors: sortText(colors),
        minPrice: priceStats[0]?.minPrice ?? 0,
        maxPrice: priceStats[0]?.maxPrice ?? 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch filter options",
      error: error.message
    });
  }
});

/* -------------------------------------------------
   GET /api/cars/:id/similar
   Up to 3 cars with the same brand or body type.
   ------------------------------------------------- */
router.get("/:id/similar", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car id"
      });
    }

    const car = await Car.findById(id).lean();

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    let similar = await Car.find({
      _id: { $ne: car._id },
      $or: [{ brand: car.brand }, { bodyType: car.bodyType }]
    })
      .sort({ rating: -1 })
      .limit(3)
      .lean();

    // Fill the remaining slots with other cars if there are fewer than 3
    if (similar.length < 3) {
      const excludeIds = [car._id, ...similar.map((item) => item._id)];

      const extra = await Car.find({ _id: { $nin: excludeIds } })
        .sort({ rating: -1 })
        .limit(3 - similar.length)
        .lean();

      similar = similar.concat(extra);
    }

    res.status(200).json({
      success: true,
      data: similar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch similar cars",
      error: error.message
    });
  }
});

/* -------------------------------------------------
   GET /api/cars/:id
   ------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car id"
      });
    }

    const car = await Car.findById(id).lean();

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch car",
      error: error.message
    });
  }
});

module.exports = router;