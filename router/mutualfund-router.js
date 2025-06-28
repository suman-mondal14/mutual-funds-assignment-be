import { Router } from "express";
import {
  saveFund,
  getFundsByUser,
  deleteFund,
} from "../controllers/mutualfund-controller.js";

const router = Router();

// Save mutual fund
router.post("/save-mutual-fund", saveFund);

// Get all saved funds by user ID
router.get("/get-mutual-funds/:userId", getFundsByUser);

//delete mutual funds
router.delete("/delete-mutual-fund/:userId/:schemeCode", deleteFund);

export default router;
