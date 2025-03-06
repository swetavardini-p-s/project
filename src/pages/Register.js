import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";// Import the Navbar component

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5500/api/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.message === "User already exists") {
        setError("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message === "User already exists") {
        setError("User already exists. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Error registering user. Please try again.");
      }
    }
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
              <li><Link to="/analytics" className="hover:text-yellow-500 transition duration-300">Analytics</Link></li>
              <li><Link to="/profile" className="hover:text-yellow-500 transition duration-300">Profile</Link></li>
              <li><Link to="/support" className="hover:text-yellow-500 transition duration-300">Help & Support</Link></li>
            </ul>
          </nav>
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700 animate-pulse">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-600 transition duration-300 transform hover:scale-105"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>
      <footer className="footer bg-gradient-to-r from-blue-800 to-purple-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  
  );
};

export default Register;