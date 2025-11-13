import express from "express";
import { getUniversities, addUniversity, getUniversityById, updateUniversity, deleteUniversity } from "../controllers/universityController.js";

const router = express.Router();

router.get("/", getUniversities);
router.post("/", addUniversity);
router.get("/:id", getUniversityById);
router.put("/:id", updateUniversity);
router.delete("/:id", deleteUniversity);



export default router;
