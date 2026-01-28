import path from "path";
import { getCSVFilesInFolder, parseCSVFileToTransactions } from "../utils/csvParser";
import { insertTransactions } from "../queries/transactions";

/**
 * Process all new CSVs in the data folder and insert them into the database
 * @param dataFolderPath path to /data folder
 */
export async function processNewData(dataFolderPath: string) {
  // Get all CSV files recursively
  const csvFiles = getCSVFilesInFolder(dataFolderPath);
  let totalTransactions = 0;

  for (const filePath of csvFiles) {
    // Derive accountId from the folder name: /data/<accountId>/file.csv
    const accountId = path.basename(path.dirname(filePath));

    // Parse and normalize CSV rows into Transaction[]
    const transactions = await parseCSVFileToTransactions(filePath, accountId);

    // Insert transactions into the DB
    insertTransactions(transactions);

    totalTransactions += transactions.length;
  }

  return { message: `Processed ${totalTransactions} transactions.` };
}
