const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "";
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
  console.error("MongoDB connection failed:");
  console.error(error);   // full error instead of just .message
  process.exit(1);
  }
};

module.exports = connectDB;