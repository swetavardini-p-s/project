import axios from "axios";

// Backend URL (Update this based on your setup)
const API_URL = "http://localhost:5500"; 

// Fetch Parking & No-Parking Zones Near Location
export const getParkingZones = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_URL}/api/parking/zones`, {
      params: { lat: latitude, lng: longitude },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching parking zones:", error);
    return { error: "Failed to load parking zones." };
  }
};

// Fetch Parking Slot Pricing
export const getParkingPricing = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/parking/pricing`);
    return response.data;
  } catch (error) {
    console.error("Error fetching parking pricing:", error);
    return { error: "Failed to load parking pricing." };
  }
};

// Fetch Available Events
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return { error: "Failed to load events." };
  }
};

// Fetch Event Details
export const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    return { error: "Failed to load event details." };
  }
};

// Book an Event
export const bookEvent = async (eventId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/events/book`, {
      eventId,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error booking event:", error);
    return { error: "Failed to book event." };
  }
};
