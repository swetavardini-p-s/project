import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // Import CSS

const Rewards = () => {
  const [points, setPoints] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleAddPoints = () => {
    const amount = parseInt(paymentAmount, 10);
    if (!isNaN(amount)) {
      setPoints(points + amount);
      setPaymentAmount("");
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <header className="header bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-blue-800 to-purple-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link></li>
          <li><Link to="/login" className="hover:text-yellow-500 transition duration-300">Login</Link></li>
          <li><Link to="/register" className="hover:text-yellow-500 transition duration-300">Register</Link></li>
          <li><Link to="/dashboard" className="hover:text-yellow-500 transition duration-300">Dashboard</Link></li>
          <li><Link to="/parking" className="hover:text-yellow-500 transition duration-300">Parking Management</Link></li>
          <li><Link to="/events" className="hover:text-yellow-500 transition duration-300">Event Scheduling</Link></li>
          <li><Link to="/rewards" className="hover:text-yellow-500 transition duration-300">Rewards</Link></li>
          <li><Link to="/payment" className="hover:text-yellow-500 transition duration-300">Payment</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-500 transition duration-300">Profile</Link></li>
          <li><Link to="/support" className="hover:text-yellow-500 transition duration-300">Help & Support</Link></li>
        </ul>
      </nav>

      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">My Rewards</h2>
          <p className="text-lg mb-4">You have <strong className="text-green-500">{points}</strong> reward points.</p>
          <input
            type="number"
            placeholder="Enter payment amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 mb-4"
          />
          <button
            onClick={handleAddPoints}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105"
          >
            Add Points
          </button>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-blue-800 to-purple-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Rewards;