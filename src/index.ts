// import path from "path";
// import { parseCSV, getCSVFilesInFolder, CSVRow } from "./utils/csvParser";
// import { normalizeTransactions } from "./normalizeTransactions";
// import { insertTransaction, getAllTransactions } from "./db";

// const DATA_FOLDER = path.join(__dirname, "..", "data");

// async function main() {
//   try {
//     const csvFiles = getCSVFilesInFolder(DATA_FOLDER);
//     console.log("Found CSV files:", csvFiles);

//     for (const file of csvFiles) {
//       const rows: CSVRow[] = await parseCSV(file);

//       const accountId = path.basename(path.dirname(file));
//       const transactions = normalizeTransactions(rows, accountId);

//       // Insert transactions into SQLite
//       transactions.forEach(tx => insertTransaction(tx));
//     }

//     console.log("All CSV files inserted into SQLite DB.");

//     // Fetch and display total transactions
//     const allTx = getAllTransactions();
//     console.log("Total transactions in DB:", allTx.length);
//   } catch (err: any) {
//     console.error("Error:", err.message);
//   }
// }

// main();

import express from "express";
import budgetTrackerRouter from "./api";

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount all budget tracker endpoints under /budgettracker
app.use("/budgettracker", budgetTrackerRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/budgettracker`);
});
