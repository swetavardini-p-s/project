import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css"; 
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaCamera, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.jpeg";
import avatar3 from "../assets/images/avatar3.png";
import avatar4 from "../assets/images/avatar4.jpeg";

const avatarOptions = [avatar1, avatar2, avatar3, avatar4];

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 123 456 7890",
    location: "New York, United States",
    occupation: "Software Engineer",
    university: "Columbia University - New York",
    events: 0,
    rewards: 0,
    parking: 0,
    profileImage: "/default-avatar.png",
  });

  const avatarOptions = [
    "./avatar1.png",
    "./avatar2.jpeg",
    "./avatar3.jpeg",
    "./avatar4.jpeg",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prevProfile) => ({ ...prevProfile, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    setCapturing(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 200, 200);
    const imageData = canvasRef.current.toDataURL("image/png");
    setProfile((prevProfile) => ({ ...prevProfile, profileImage: imageData }));
    stopCamera();
  };

  const stopCamera = () => {
    setCapturing(false);
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <motion.header 
        className="header bg-gradient-to-r from-purple-700 to-pink-500 text-white p-6 shadow-lg rounded-b-3xl text-center"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <h1 className="text-5xl font-extrabold">🚀 Create your own Profile 🚀</h1>
      </motion.header>

      <main className="flex-grow flex items-center justify-center p-8">
        <motion.div className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full max-w-4xl transform hover:scale-105 transition-transform">
          <motion.div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1 }}>
            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover cursor-pointer" onClick={() => fileInputRef.current.click()} />
            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
          </motion.div>

          <div className="mt-4 space-x-4 flex justify-center">
            <button onClick={() => setShowAvatarSelection(true)} className="bg-gray-500 text-white px-3 py-2 rounded-full shadow-md">🎭 Choose Avatar</button>
            <button onClick={startCamera} className="bg-green-500 text-white px-3 py-2 rounded-full shadow-md">📷 Take a Photo</button>
          </div>

          {showAvatarSelection && (
            <motion.div className="mt-4 flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              {avatarOptions.map((avatar, index) => (
                <img key={index} src={avatar} alt={`Avatar ${index}`} className="w-16 h-16 rounded-full cursor-pointer border-2 border-gray-400 hover:border-blue-500" onClick={() => setProfile((prevProfile) => ({ ...prevProfile, profileImage: avatar }))} />
              ))}
            </motion.div>
          )}

          <div className="mt-6 text-left text-lg text-gray-700">
            <p><FaUser className="inline mr-2" /> {profile.name}</p>
            <p><FaEnvelope className="inline mr-2" /> {profile.email}</p>
            <p><FaPhone className="inline mr-2" /> {profile.mobile}</p>
          </div>

          {isEditing ? (
            <div className="mt-6 space-y-4">
              <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Name" />
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Email" />
              <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Mobile" />
              <button onClick={handleEditToggle} className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md"><FaSave className="inline mr-2" />Save</button>
            </div>
          ) : (
            <button onClick={handleEditToggle} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"><FaEdit className="inline mr-2" />Edit Profile</button>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;