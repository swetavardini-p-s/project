import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css"; // Import styles
import { motion } from "framer-motion";

const HelpSupport = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback({ name: "", email: "", message: "" });
  };

  const faqs = [
    { question: "How do I book a parking slot?", answer: "Go to the Parking Management page, select a location, and follow the steps." },
    { question: "Can I cancel my booking?", answer: "Yes, cancellations are allowed up to 1 hour before the booking time." },
    { question: "How does the reward system work?", answer: "You earn 50 stars per ₹1 spent, which can be redeemed in future bookings." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white flex flex-col items-center p-6"
    >
      <motion.h1 
        className="text-5xl font-bold mb-6"
        animate={{ scale: [0.9, 1.1, 1] }}
        transition={{ duration: 0.5 }}
      >
        Help & Support
      </motion.h1>
      <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-purple-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="border-b pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <button 
                className="w-full text-left font-semibold text-lg flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question} 
                <span className="transform transition-transform duration-300" style={{ transform: faqOpen === index ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ▼
                </span>
              </button>
              {faqOpen === index && <motion.p className="text-gray-600 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{faq.answer}</motion.p>}
            </motion.div>
          ))}
        </div>
        
        <h2 className="text-3xl font-semibold text-purple-700 mt-6 mb-4">Feedback Form</h2>
        <motion.form 
          className="space-y-4" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input type="text" name="name" placeholder="Your Name" className="w-full p-2 border rounded" value={feedback.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" className="w-full p-2 border rounded" value={feedback.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" className="w-full p-2 border rounded h-24" value={feedback.message} onChange={handleChange} required></textarea>
          <motion.button 
            type="submit" 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit Feedback
          </motion.button>
        </motion.form>
      </div>

      <Link to="/" className="mt-6 text-yellow-300 hover:underline">Back to Home</Link>
    </motion.div>
  );
};

export default HelpSupport;