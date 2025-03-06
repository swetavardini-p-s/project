const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount: Number,
    method: { type: String, enum: ['UPI', 'Card', 'Wallet'] },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  });

  const payForParking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("❌ Unauthorized: No token found. Please log in.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5500/api/parking/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Send token
            },
            body: JSON.stringify({
                bookingId: "12345",
                amount: 50
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Payment successful!");
        } else {
            alert(data.message || "❌ Payment failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ An error occurred.");
    }
};

  
export default mongoose.model('Payment', PaymentSchema);