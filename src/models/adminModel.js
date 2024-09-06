import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  permissions: [
    { type: String, enum: ["Manage Users", "Manage Roles", "View Reports"] },
  ],
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
