import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold animate-bounce">🚗 Parking System</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-yellow-300 transition duration-300">Register</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-yellow-300 transition duration-300">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;