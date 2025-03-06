import mongoose from "mongoose";
import Parking from "../models/Parking.js";
import connectDB from "../db.js";

connectDB();

const parkingData = [
  { name: "City Mall Parking", location: "Downtown", price: 50 },
  { name: "Central Park Garage", location: "Main Street", price: 70 },
  { name: "Airport Parking", location: "Airport Road", price: 100 },
];

const insertParkingSlots = async () => {
  try {
    await Parking.insertMany(parkingData);
    console.log("✅ Parking locations with price added!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
};

insertParkingSlots(); 