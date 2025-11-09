import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  ranking: { type: Number, required: true },
  programs: [String]
});

const University = mongoose.model("University", universitySchema);

export default University;
