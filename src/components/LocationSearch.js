import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ onLocationSelect }) => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [parkingSpots, setParkingSpots] = useState([]);

  const handleSearch = async () => {
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/parking?location=${location}`);
      setParkingSpots(response.data);  // Store fetched parking spots
      onLocationSelect(location);  // Pass the selected location to parent
    } catch (error) {
      setError("Error fetching parking spots. Try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Find Nearby Parking</h2>
      <input
        type="text"
        placeholder="Enter location..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {parkingSpots.length > 0 ? (
          <ul className="text-left">
            {parkingSpots.map((spot) => (
              <li key={spot._id} className="border p-2 rounded-lg shadow-sm mb-2">
                {spot.name} - ₹{spot.price}/hour
              </li>
            ))}
          </ul>
        ) : (
          <p>No parking spots found.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;