import { Router } from "express";
import path from "path";
import { processNewData } from "../services/dataProcessor";

const router = Router();

/**
 * GET /budgettracker/processdata
 * Parses all CSVs in the /data folder and inserts them into SQLite
 */
router.get("/", async (req, res) => {
  try {
    // Adjust this path if your data folder is elsewhere
    const dataFolder = path.join(__dirname, "../../data");

    const result = await processNewData(dataFolder);

    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
