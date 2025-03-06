import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [slotId, setSlotId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  // ✅ Handle Payment Request
  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/api/auth/parking/pay",
        { slotId, paymentMethod },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMessage(`✅ Payment successful via ${paymentMethod}!`);
      } else {
        setMessage("❌ Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">
          🚗 Parking Payment 🚀
        </h1>
      </header>

      {/* Navbar */}
      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-500 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:text-yellow-500 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/parking"
              className="hover:text-yellow-500 transition duration-300"
            >
              Parking Management
            </Link>
          </li>
          <li>
            <Link
              to="/payment"
              className="hover:text-yellow-500 transition duration-300"
            >
              Payment
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-yellow-500 transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className="hover:text-yellow-500 transition duration-300"
            >
              Help & Support
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">
            Make Payment
          </h2>

          <input
            type="text"
            placeholder="Enter Slot ID"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 mb-4"
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-4"
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>

          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105"
          >
            Pay Now
          </button>

          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Payment;