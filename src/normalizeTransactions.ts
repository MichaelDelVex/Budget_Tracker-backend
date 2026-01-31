import crypto from "crypto";
import { CSVRow } from "./utils/csvParser";
import { Transaction } from "./types/transactions.types";

/**
 * Generate a unique hash for a transaction
 */
export function generateTransactionId(accountId: string, row: CSVRow): string {
  const str = `${accountId}-${row['Date']}-${row['Transaction Details']}-${row['Amount']}`;
  return crypto.createHash('md5').update(str).digest('hex');
}

/**
 * Convert CSVRow[] into Transaction[]
 * Maps CSV headers to our internal Transaction type
 */
export function normalizeTransactions(rows: CSVRow[], accountId: string): Transaction[] {
  return rows
    .filter(row => row['Date'] && row['Amount'] && row['Transaction Details'])
    .map(row => ({
      id: generateTransactionId(accountId, row),
      accountId,
      date: new Date(row['Date']), // will parse '15 Dec 25'
      description: row['Transaction Details'],
      amount: parseFloat(row['Amount']),
      category: row['Category'] || undefined,
      raw: row
    }));
}
