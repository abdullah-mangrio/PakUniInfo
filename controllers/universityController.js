import mongoose from "mongoose";
import University from "../models/University.js";

// GET /api/universities  -> get all universities (with optional filters)
export const getUniversities = async (req, res) => {
  try {
    const {
      province,
      location,
      city,
      program,
      name,
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    const filter = {};

    // province filter (case-insensitive exact match)
    if (province) {
      filter.province = { $regex: `^${province}$`, $options: "i" };
    }

    // ✅ name search (support both "name" and old "search")
    const nameQuery = name || search;
    if (nameQuery) {
      filter.name = { $regex: nameQuery, $options: "i" };
    }

    // ✅ city/location: support both and match either city OR location text
    const cityQuery = city || location;
    if (cityQuery) {
      filter.$or = [
        { city: { $regex: cityQuery, $options: "i" } },
        { location: { $regex: cityQuery, $options: "i" } },
      ];
    }

    // program filter (array-friendly, case-insensitive)
    if (program) {
      filter.programs = { $regex: program, $options: "i" };
    }

    // Sorting
    const allowedSortFields = ["name", "ranking", "location", "province", "city"];
    let sort = { ranking: -1 }; // default

    if (sortBy && allowedSortFields.includes(sortBy)) {
      const order = sortOrder === "desc" ? -1 : 1; // default asc
      sort = { [sortBy]: order };
    }

    // ⭐ Pagination
    const pageNumber = Number(page) || 1; // default: page 1
    const limitNumber = Number(limit) || 10; // default: 10 per page
    const skip = (pageNumber - 1) * limitNumber;

    // Total count (for this filter)
    const total = await University.countDocuments(filter);

    // Get paginated results
    const universities = await University.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    return res.json({
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalResults: total,
      results: universities,
    });
  } catch (err) {
    console.error("Error in getUniversities:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//------------------------------------------------------------ADD SECTION--------------------------------------------------------------------------

// POST /api/universities  -> add a new university
export const addUniversity = async (req, res) => {
  try {
    const newUni = new University(req.body);
    const savedUni = await newUni.save();
    return res.status(201).json(savedUni);
  } catch (err) {
    console.error("Error in addUniversity:", err.message);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", details: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

//---------------------------------------------------------------GET UNI BY ID -----------------------------------------------------------------------

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

//-----------------------------------------------------------UPDATE BY ID---------------------------------------------------------------------------

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
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "University not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("Error in updateUniversity:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", details: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

//-------------------------------------------------------DELETE BY ID-------------------------------------------------------------------------------

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
