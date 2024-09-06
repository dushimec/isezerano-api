import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String },
  penalty: { type: String, enum: ["None", "Off for a month"], default: "None" },
});

const Discipline = mongoose.model("Discipline", disciplineSchema);
export default Discipline;
