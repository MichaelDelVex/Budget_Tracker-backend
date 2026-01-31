import { Router } from "express";
import { getAllAccountIds } from "../queries/accounts";
import { getTransactionsForAccount } from "../queries/transactions";

const router = Router();

// GET /budgettracker/accounts
router.get("/", (req, res) => {
  try {
    const accounts = getAllAccountIds();
    res.json(accounts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /budgettracker/accounts/:accountId/transactions
router.get("/:accountId/transactions", (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = getTransactionsForAccount(accountId);
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
