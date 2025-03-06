import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; // ✅ Import auth routes
import router from "./routes/parkingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import parkingRoutes from "./routes/parkingRoutes.js";
// app.use("/api/parking", parkingRoutes);
// app.use("/api/booking", bookingRoutes);


dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(express.json()); // ✅ Enable JSON parsing
app.use(cors()); // ✅ Fix CORS errors

// ✅ API Routes
app.use("/api/auth", authRoutes); // ✅ Ensure this line exists    
app.use("/api/user", router); // ✅ Ensure this line exists
//app.use("/api/book", bookingRoutes);//is line exists
app.use("/api/booking", bookingRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/parking-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));