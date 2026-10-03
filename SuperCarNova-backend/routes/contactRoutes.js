const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

// Save contact form data
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save contact form",
      error: error.message
    });
  }
});

module.exports = router;