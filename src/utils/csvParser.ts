import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { Transaction } from "../types/transactions.types";

export type CSVRow = Record<string, string>;

/**
 * Parse a single CSV file into an array of objects.
 */
export function parseCSV(filePath: string, options: Record<string, any> = {}): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const records: CSVRow[] = [];
    const defaultOptions = {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      ...options,
    };

    fs.createReadStream(filePath)
      .pipe(parse(defaultOptions))
      .on("data", (row: CSVRow) => records.push(row))
      .on("end", () => resolve(records))
      .on("error", (err) => reject(err));
  });
}

/**
 * Get all CSV files inside a folder and its immediate subfolders
 */
export function getCSVFilesInFolder(folderPath: string): string[] {
  const files: string[] = [];
  const children = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const child of children) {
    const childPath = path.join(folderPath, child.name);

    if (child.isFile() && child.name.toLowerCase().endsWith(".csv")) {
      files.push(childPath);
    } else if (child.isDirectory()) {
      const subFiles = fs.readdirSync(childPath)
        .filter(f => f.toLowerCase().endsWith(".csv"))
        .map(f => path.join(childPath, f));
      files.push(...subFiles);
    }
  }

  return files;
}

export function normalizeCSVRowsToTransactions(rows: CSVRow[], accountId: string): Transaction[] {
  return rows.map(row => ({
    id: row.id || undefined,
    accountId,
    date: new Date(row.Date || row["Processed On"] || Date.now()),
    description: row["Transaction Details"] || row.description || "",
    amount: parseFloat(row.Amount || "0"),
    category: row.Category || undefined,
    raw: row,
  }));
}


export async function parseCSVFileToTransactions(filePath: string, accountId: string): Promise<Transaction[]> {
  const rows = await parseCSV(filePath);
  return normalizeCSVRowsToTransactions(rows, accountId);
}


export async function getAllTransactionsFromFolder(folderPath: string): Promise<Transaction[]> {
  const files = getCSVFilesInFolder(folderPath);
  const allTransactions: Transaction[] = [];

  for (const file of files) {
    const accountId = path.basename(path.dirname(file));
    const transactions = await parseCSVFileToTransactions(file, accountId);
    allTransactions.push(...transactions);
  }

  return allTransactions;
}
