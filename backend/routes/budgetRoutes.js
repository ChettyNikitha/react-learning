import express from "express";
import { saveBudget, getUserBudgets} from "../budgetController.js";

const router = express.Router();

// POST /api/budget/save
router.post("/save", saveBudget);
router.get("/user/:user_id", getUserBudgets);

export default router;
