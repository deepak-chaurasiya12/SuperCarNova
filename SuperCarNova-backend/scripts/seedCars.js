/*
  Run from the backend folder with:   node scripts/seedCars.js

  WARNING: this deletes every document in the "cars" collection
  and replaces it with the data from data/carsSeed.js.
*/

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const mongoose = require("mongoose");

const Car = require("../models/Car");
const cars = require("../data/Carsdata");

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);

    await Car.deleteMany({});
    console.log("Old cars removed");

    const inserted = await Car.insertMany(cars);
    console.log(`${inserted.length} cars added successfully`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:");
    console.error(error);
    process.exit(1);
  }
};

seedCars();