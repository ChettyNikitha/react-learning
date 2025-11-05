import express from "express";
import { saveBudget } from "../budgetController.js";

const router = express.Router();

// POST /api/budget/save
router.post("/save", saveBudget);

export default router;
