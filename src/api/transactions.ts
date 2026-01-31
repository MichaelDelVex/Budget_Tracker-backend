import { Router } from "express";
import { getAllTransactions, getTransactionsForAccount} from "../queries/transactions";

const router = Router();

/**
 * GET /budgettracker/accounts
 * Returns all accountIds
 */
router.get("/", (req, res) => {
  try {
    const accounts = getAllTransactions();
    res.json(accounts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /budgettracker/accounts/:accountId/transactions
 * Returns all transactions for a specific account
 */
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
