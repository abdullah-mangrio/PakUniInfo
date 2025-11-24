import express from "express";
import { getUniversities,
         addUniversity,
         getUniversityById,
         updateUniversity, 
         deleteUniversity 
} from "../controllers/universityController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public reads
router.get("/", getUniversities);
router.get("/:id", getUniversityById);

// Protected writes
router.post("/", requireAdmin, addUniversity);
router.put("/:id", requireAdmin, updateUniversity);
router.delete("/:id", requireAdmin, deleteUniversity);

export default router;
