import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("admins", AdminSchema);
export default Admin;
