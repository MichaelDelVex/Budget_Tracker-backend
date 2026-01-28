import Database from "better-sqlite3";
import path from "path";
import { Transaction } from "./types/transactions.types";

const DB_PATH = path.join(__dirname, "..", "db", "budget.db");

// Open the database (creates file if it doesn't exist)
export const db = new Database(DB_PATH);

// Create the transactions table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    accountId TEXT,
    date TEXT,
    description TEXT,
    amount REAL,
    category TEXT,
    raw TEXT
  )
`).run();

/**
 * Insert a transaction into the database
 * Skips if the transaction ID already exists
 */
export function insertTransaction(tx: Transaction) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO transactions (id, accountId, date, description, amount, category, raw)
    VALUES (@id, @accountId, @date, @description, @amount, @category, @raw)
  `);

  stmt.run({
    ...tx,
    date: tx.date.toISOString(),
    raw: JSON.stringify(tx.raw),
  });
}

/**
 * Fetch all transactions from the database
 */
export function getAllTransactions(): Transaction[] {
  const stmt = db.prepare(`SELECT * FROM transactions`);

  // Tell TypeScript what the shape of each row is
  const rows: {
    id: string;
    accountId: string;
    date: string;
    description: string;
    amount: number;
    category: string | null;
    raw: string;
  }[] = stmt.all() as any; // or use <RowType[]>

  return rows.map(row => ({
    id: row.id,
    accountId: row.accountId,
    date: new Date(row.date),
    description: row.description,
    amount: row.amount,
    category: row.category || undefined,
    raw: JSON.parse(row.raw)
  }));
}
