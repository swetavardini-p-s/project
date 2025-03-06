import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link></li>
          <li><Link to="/register" className="hover:text-yellow-500 transition duration-300">Register</Link></li>
          <li><Link to="/login" className="hover:text-yellow-500 transition duration-300">Login</Link></li>
          <li><Link to="/dashboard" className="hover:text-yellow-500 transition duration-300">Dashboard</Link></li>
          <li><Link to="/parking" className="hover:text-yellow-500 transition duration-300">Parking Management</Link></li>
          <li><Link to="/events" className="hover:text-yellow-500 transition duration-300">Event Scheduling</Link></li>
          <li><Link to="/rewards" className="hover:text-yellow-500 transition duration-300">Rewards</Link></li>
          <li><Link to="/payment" className="hover:text-yellow-500 transition duration-300">Payment</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-500 transition duration-300">Profile</Link></li>
          <li><Link to="/support" className="hover:text-yellow-500 transition duration-300">Help & Support</Link></li>
        </ul>
      </nav>

      <main className="main-container flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 p-8">
        <div className="container text-center">
          <h2 className="text-4xl font-semibold mb-4 animate-pulse text-purple-700">Experience the Future of Parking!</h2>
          <p className="mb-6 text-lg text-gray-700">Manage your parking spots, events, and rewards seamlessly with a cutting-edge, animated interface.</p>
          <Link to="/Register" className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105">Get Started</Link>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;