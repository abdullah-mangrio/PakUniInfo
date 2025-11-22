// backend/models/University.js
import mongoose from "mongoose";

const admissionCycleSchema = new mongoose.Schema(
  {
    // e.g. "Fall 2025", "Spring", "MBBS", etc.
    name: { type: String },

    // When applications open for this cycle
    applicationOpenDate: { type: Date },

    // Last date to apply for this cycle
    applicationDeadline: { type: Date },

    // Any extra info like "NTS required", "via HEC portal", etc.
    notes: { type: String },
  },
  { _id: false } // we don't really need individual IDs for each cycle
);

const universitySchema = new mongoose.Schema({
  // Basic info
  name: { type: String, required: true },
  location: { type: String, required: true }, // e.g. "Main Campus, Lahore"
  city: { type: String }, // Admin panel already sends this
  province: { type: String },
  ranking: { type: Number },

  // Academic offerings
  programs: [String], // e.g. ["BS CS", "BBA", "MBBS"]

  // Web presence
  website: { type: String },

  // Description / overview
  description: { type: String },

  // 💸 Fee info (all optional)
  // Store approximate yearly tuition range in PKR
  tuitionFeeMin: { type: Number }, // e.g. 150000
  tuitionFeeMax: { type: Number }, // e.g. 350000
  tuitionFeeCurrency: { type: String, default: "PKR" },
  tuitionFeeNote: {
    type: String, // e.g. "Varies by program, excludes hostel"
  },

  // 📅 Admission timeline
  // For multiple intakes (Fall, Spring, MBBS special cycle, etc.)
  admissionCycles: [admissionCycleSchema],

  // Quick generic notes (shown in details page)
  admissionNotes: { type: String },

  // 🖼️ Images / branding
  logoUrl: { type: String }, // small square logo
  heroImageUrl: { type: String }, // main banner / cover image
  galleryImages: [String], // extra images (campus, labs, etc.)
});

const University = mongoose.model("University", universitySchema);
export default University;
