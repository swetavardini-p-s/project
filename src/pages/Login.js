import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5500/api/auth/login", {
        method: "POST", // ✅ Ensure it's a POST request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // ✅ Send user input
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        window.location.href = data.redirectTo || "/dashboard"; // ✅ Redirect
      } else {
        console.error("Login failed:", data.msg);
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
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
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold mb-4 text-red-700 animate-pulse">Login Page</h2>
          
          {/* Error Message */}
          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email:</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" 
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r from-green-500 to-blue-600 transition duration-300 transform hover:scale-105">
              Login
            </button>
          </form>
        </div>
      </main>

      <footer className="footer bg-gradient-to-r from-green-800 to-blue-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;