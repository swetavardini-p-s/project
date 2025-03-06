import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Rewards from "./pages/Rewards";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Parking from "./pages/Parking"; // Fixed component name

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUser(token ? true : null); // Properly sets user state
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null); // Update state immediately on logout
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />} />

                {/* Protected Routes (Require Login) */}
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/rewards" element={user ? <Rewards /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
                <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
                <Route path="/events" element={user ? <Events /> : <Navigate to="/login" />} />
                <Route path="/parking" element={user ? <Parking /> : <Navigate to="/login" />} />

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;