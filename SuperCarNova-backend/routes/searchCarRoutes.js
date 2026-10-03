const express = require("express");
const router = express.Router();

const SearchCar = require("../models/SearchCar");

// Save search data
router.post("/", async (req, res) => {
  try {
    const search = new SearchCar(req.body);

    const savedSearch = await search.save();

    res.status(201).json({
      success: true,
      message: "Search saved successfully",
      data: savedSearch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save search",
      error: error.message
    });
  }
});

module.exports = router;