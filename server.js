import express from "express";
import { connectDB } from "./config.js";
import dotenv from "dotenv";
import universityRoutes from "./routes/universityRoutes.js"; // ✅ Step 1: Import routes
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


// ✅ Step 2: Use the university routes
app.use("/api/universities", universityRoutes);

// (Optional) You can keep your sample route for testing:
import University from "./models/University.js";

app.get("/add-sample", async (req, res) => {
  try {
    const sampleUni = new University({
      name: "FAST NUCES",
      city: "Peshawar",
      ranking: 1,
      programs: ["BSCS", "BSEE", "BSIT"]
    });

    await sampleUni.save();
    res.send("Sample university added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding sample university");
  }
});

app.get("/", (req, res) => {
  res.send("PakUniInfo backend is running successfully!");
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
