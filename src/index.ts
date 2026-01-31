import express from "express";
import budgetTrackerRouter from "./api";
import { requestIdMiddleware } from "./middleware/requestId";

import morgan from "morgan";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(requestIdMiddleware);

// Templated dev debug logging
app.use(
  morgan(":method :url :status :response-time ms - :req[x-request-id]")
);

// Mount all budget tracker endpoints under /budgettracker
app.use("/budgettracker", budgetTrackerRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/budgettracker`);
});
