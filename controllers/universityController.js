import mongoose from "mongoose";
import University from "../models/University.js";


// GET /api/universities  -> get all universities
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    return res.json(universities);
  } catch (err) {
    console.error("Error in getUniversities:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/universities  -> add a new university
export const addUniversity = async (req, res) => {
  try {
    const newUni = new University(req.body);
    const savedUni = await newUni.save();
    return res.status(201).json(savedUni);
  } catch (err) {
    console.error("Error in addUniversity:", err.message);

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/universities/:id  -> get one by ID
export const getUniversityById = async (req, res) => {
  const { id } = req.params;

  // ✅ Pre-check ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid university ID format" });
  }

  try {
    const uni = await University.findById(id);

    if (!uni) {
      return res.status(404).json({ message: "University not found" });
    }

    return res.json(uni);
  } catch (err) {
    console.error("Error in getUniversityById:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// PUT /api/universities/:id  -> update by ID
export const updateUniversity = async (req, res) => {
  const { id } = req.params;

  // ✅ Pre-check ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid university ID format" });
  }

  try {
    const updated = await University.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: "University not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("Error in updateUniversity:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};



// DELETE /api/universities/:id  -> delete by ID
export const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  // ✅ Pre-check ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid university ID format" });
  }

  try {
    const removed = await University.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ message: "University not found" });
    }

    return res.json({ message: "University deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUniversity:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

