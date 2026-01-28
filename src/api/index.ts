import { Router } from "express";
import transactionsRouter from "./transactions";
import accountsRouter from "./accounts";
import processDataRouter from "./processdata";

const router = Router();

router.use("/transactions", transactionsRouter);
router.use("/accounts", accountsRouter);
router.use("/processdata", processDataRouter);

export default router;
