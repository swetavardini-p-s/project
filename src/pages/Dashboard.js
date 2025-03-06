import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParkingZones } from "../api"; // Import API function
import "../assets/styles.css"; // Import CSS

const Dashboard = () => {
  const [parkingZones, setParkingZones] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getParkingZones(latitude, longitude);
      setParkingZones(data.zones || []);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('C:/Users/bhara/parking-management-frontend/dashborad.jpeg')" }}>
      
      {/* Header */}
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      {/* Navbar */}
      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8 bg-opacity-75">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/parking" className="block w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105">
                  Parking
                </Link>
              </li>
              <li>
                <Link to="/events" className="block w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-600 transition duration-300 transform hover:scale-105">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-yellow-500 to-orange-600 transition duration-300 transform hover:scale-105">
                  Rewards
                </Link>
              </li>
              <li>
                <Link to="/profile" className="block w-full bg-gradient-to-r from-red-400 to-purple-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-red-500 to-purple-600 transition duration-300 transform hover:scale-105">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          {/* Parking Zones Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Nearby Parking Zones</h3>
            {parkingZones.length === 0 ? (
              <p className="text-gray-600">Loading or No Parking Zones Found...</p>
            ) : (
              <ul className="text-left">
                {parkingZones.map((zone, index) => (
                  <li key={index} className="bg-gray-200 text-gray-800 p-2 rounded mb-2">
                    {zone.name} - <span className={zone.type === "No Parking" ? "text-red-600" : "text-green-600"}>{zone.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default Dashboard;