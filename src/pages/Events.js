import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // Import CSS

const Events = () => {
  const handleBooking = (event) => {
    alert(`Booking for ${event}...`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <header className="header bg-gradient-to-r from-indigo-500 to-teal-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-green-800 to-blue-900 text-white p-4 shadow-md">
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
        <div className="container max-w-6xl bg-white p-12 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-6 text-purple-700 animate-pulse">Upcoming Events</h2>
          <ul className="list-disc list-inside text-left text-lg text-gray-700">
            <li className="mb-4 flex justify-between items-center">
              <span className="font-bold text-blue-600">Tech Expo 2025</span> - <span className="text-gray-500">April 10</span>
              <button 
                onClick={() => handleBooking('Tech Expo 2025')} 
                className="ml-4 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105"
              >
                Book
              </button>
            </li>
            <li className="mb-4 flex justify-between items-center">
              <span className="font-bold text-blue-600">Music Festival</span> - <span className="text-gray-500">May 5</span>
              <button 
                onClick={() => handleBooking('Music Festival')} 
                className="ml-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-600 transition duration-300 transform hover:scale-105"
              >
                Book
              </button>
            </li>
          </ul>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-green-800 to-blue-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Events;