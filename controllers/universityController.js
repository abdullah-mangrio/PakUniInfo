import University from "../models/University.js";

export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addUniversity = async (req, res) => {
  try {
    const newUni = new University(req.body);
    const savedUni = await newUni.save();
    res.status(201).json(savedUni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);
    if (!uni) return res.status(404).json({ message: "University not found" });
    res.json(uni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

