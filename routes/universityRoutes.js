import express from "express";
import { getUniversities, addUniversity, getUniversityById } from "../controllers/universityController.js";

const router = express.Router();

router.get("/", getUniversities);
router.post("/", addUniversity);
router.get("/:id", getUniversityById);


export default router;
