import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  province: { type: String },
  ranking: { type: Number },
  programs: [String],
  website: { type: String },
  description: { type: String }
});

const University = mongoose.model("University", universitySchema);
export default University;
