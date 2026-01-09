// backend/models/University.js
import mongoose from "mongoose";

// Schema for a single admission cycle (e.g. "Fall 2025", "Spring", "MBBS Special")
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
  {
    _id: false, // we don't really need individual IDs for each cycle
  }
);

const universitySchema = new mongoose.Schema({
  // =====================
  // Basic info
  // =====================
  name: { type: String, required: true },
  location: { type: String, required: true }, // e.g. "Main Campus, Lahore"
  city: { type: String }, // used in frontend filters / cards
  province: { type: String },
  ranking: { type: Number },

  // =====================
  // Academic offerings
  // =====================
  // e.g. ["BSCS", "BBA", "MBBS"]
  programs: [String],

  // =====================
  // Web presence
  // =====================
  website: { type: String },

  // =====================
  // Description / overview
  // =====================
  description: { type: String },

  // =====================
  // 💸 Fee info (all optional)
  // =====================
  // These are meant to be APPROX yearly tuition ranges
  // (for typical undergraduate programmes, not exact for every degree)
  tuitionFeeMin: { type: Number }, // e.g. 150000
  tuitionFeeMax: { type: Number }, // e.g. 350000
  tuitionFeeCurrency: { type: String, default: "PKR" },
  tuitionFeeNote: {
    type: String, // e.g. "Approx. range, varies by programme; excludes hostel."
  },

  // =====================
  // 📅 Admission timeline
  // =====================
  // For multiple intakes (Fall, Spring, MBBS special cycle, etc.)
  admissionCycles: [admissionCycleSchema],

  // Generic notes shown in details page, like:
  // "Admissions usually open in June; entry test required."
  admissionNotes: { type: String },

  // =====================
  // 🖼️ Images / branding
  // =====================
  // Small logo (square-ish) – good for cards / navbar
  logoUrl: { type: String },

  // Big hero / banner image for the detail page
  heroImageUrl: { type: String },

  // Extra campus / lab / hostel shots if you want a gallery later
  galleryImages: [String],
});

// Model
const University = mongoose.model("University", universitySchema);
export default University;
