import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultCenter = { lat: 10.80000000, lng: 77.09000000 };
//{ lat: 11.0168, lng: 76.9558 };

const Parking = () => {
  const [location, setLocation] = useState("");
  const [parkingSlots, setParkingSlots] = useState([]);
  const [error, setError] = useState("");
  const [center, setCenter] = useState(defaultCenter);

  // const handleSearch = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("❌ Unauthorized: No token found. Please log in.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.get("http://localhost:5500/api/user/available", {
  //       // headers: { Authorization: `Bearer ${token}` },
  //     });
  
  //     console.log("API Response:", response.data); // Debugging Log
  
  //     const filteredSlots = response.data.filter(
  //       (slot) => slot.location.toLowerCase().trim() === location.toLowerCase().trim()
  //     );
  
  //     if (filteredSlots.length === 0) {
  //       setError("❌ No parking spots found.");
  //       setParkingSlots([]);
  //     } else {
  //       setError("");
  //       setParkingSlots(filteredSlots);
  
  //       // ✅ Set map center to first matched slot location
  //       if (filteredSlots[0].lat && filteredSlots[0].lng) {
  //         setCenter({ lat: filteredSlots[0].lat, lng: filteredSlots[0].lng });
  //       } else {
  //         console.warn("Latitude and Longitude not found for the selected location.");
  //       }
  //     }
  //   } catch (err) {
  //     setError("❌ Error fetching parking spots. Try again.");
  //     console.error("Error fetching parking slots:", err);
  //   }
  // };
  const handleSearch = async () => {
    setParkingSlots([]); // ✅ Clear old results before search
    setError(""); // ✅ Reset errors
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Unauthorized: No token found. Please log in.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:5500/api/user/available");
  
      console.log("API Response:", response.data); // ✅ Debugging Log
  
      const filteredSlots = response.data.filter(
        (slot) => slot.location.toLowerCase().trim() === location.toLowerCase().trim()
      );
  
      if (filteredSlots.length === 0) {
        setError("❌ No parking spots found.");
        return;
      }
  
      setParkingSlots(filteredSlots);
  
      // ✅ Set map center to first matched slot location
      if (filteredSlots[0].lat && filteredSlots[0].lng) {
        setCenter({ lat: filteredSlots[0].lat, lng: filteredSlots[0].lng });
      } else {
        console.warn("Latitude and Longitude not found for the selected location.");
      }
    } catch (err) {
      setError("❌ Error fetching parking spots. Try again.");
      console.error("Error fetching parking slots:", err);
    }
  };
  
  
  // const bookParkingSlot = async (slotId) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("❌ Unauthorized: Please log in to book a parking slot.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post(`http://localhost:5500/api/user/book`, //${slotId}
  //       { userId: "USER_ID" }, // Replace with actual logged-in user ID
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  
  //     alert("✅ Parking slot booked successfully!");
  //     handleSearch(); // Refresh available parking slots
  //   } catch (err) {
  //     console.error("Booking error:", err);
  //     alert("❌ Booking failed. Try again.");
  //   }
  // };

  const bookParkingSlot = async (slotId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Unauthorized: Please log in to book a parking slot.");
      return;
    }
  
    const bookingData = {
      slotId,  
      date: new Date().toISOString().split("T")[0], // 🗓️ Current date (format: YYYY-MM-DD)
      time: new Date().toLocaleTimeString(), // ⏰ Current time (format: HH:MM AM/PM)
      duration: 2, // ⏳ Default duration (change as needed)
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5500/api/booking/book",  // ✅ Fixed API URL
        bookingData,  
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert("✅ Parking slot booked successfully!");
      handleSearch(); // 🔄 Refresh available slots
    } catch (err) {
      console.error("Booking error:", err.response?.data || err);
      alert("❌ Booking failed. Try again.");
    }
  };
  

  const cancelBooking = async (slotId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Unauthorized: Please log in to cancel a booking.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5500/api/parking/cancel/${slotId}`, {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert("✅ Booking cancelled successfully!");
      handleSearch(); // Refresh available parking slots
    } catch (err) {
      console.error("Cancellation error:", err);
      alert("❌ Cancellation failed. Try again.");
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="header bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <h1 className="text-5xl font-extrabold animate-bounce">🚗 Parking Management System 🚀</h1>
      </header>

      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
          <li><Link to="/dashboard" className="hover:text-yellow-500">Dashboard</Link></li>
          <li><Link to="/parking" className="hover:text-yellow-500">Parking Management</Link></li>
          <li><Link to="/payment" className="hover:text-yellow-500">Payment</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-500">Profile</Link></li>
          <li><Link to="/support" className="hover:text-yellow-500">Help & Support</Link></li>
        </ul>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="container max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-semibold mb-4 text-purple-700">Find Parking</h2>
          <input 
            type="text" 
            placeholder="Enter location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button 
            onClick={handleSearch} 
            className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
          >
            Search
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <MapContainer center={center} zoom={14} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {parkingSlots.map((slot) => (
  <Marker key={slot._id} position={[slot.lat, slot.lng]} icon={customIcon}>
    <Popup>
      <strong>{slot.name}</strong> <br />
      {slot.location} <br />
      Price: ₹{slot.price} <br />
      {slot.available ? "✅ Available" : "❌ Booked"} <br />
      {slot.available ? (
        <button onClick={() => bookParkingSlot(slot._id)} className="bg-green-500 text-white px-3 py-1 rounded-md mt-2">
          Book Now
        </button>
      ) : (
        <button onClick={() => cancelBooking(slot._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
          Cancel Booking
        </button>
      )}
    </Popup>
  </Marker>
))}
          </MapContainer>
        </div>
      </main>

      <footer className="footer bg-gray-900 text-white p-4 text-center">
        <p>&copy; 2025 Parking Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Parking;