import cron from "node-cron";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { Booking } from "../models/Booking.js"; // Use named import
 // Ensure the correct file extension


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to check for upcoming bookings
const checkForReminders = async () => {
  const now = new Date();
  const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

  // Find bookings that start in exactly 10 minutes
  const upcomingBookings = await Booking.find({
    slotTime: {
      $gte: now,
      $lt: tenMinutesLater,
    },
  });

  upcomingBookings.forEach((booking) => {
    sendReminderEmail(booking.userEmail, booking.slotTime);
  });
};

// Function to send reminder email
const sendReminderEmail = (email, slotTime) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Parking Slot Reminder 🚗",
    text: `Hello! Your parking slot is scheduled at ${slotTime}. Please be on time! ⏳`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Reminder email sent to:", email);
    }
  });
};

// Schedule task to run every minute
cron.schedule("* * * * *", () => {
  console.log("Checking for upcoming bookings...");
  checkForReminders();
});