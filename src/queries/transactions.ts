import { db } from "../db";
import { Transaction } from "../types/transactions.types";

/**
 * Fetch all transactions in the DB
 */
export function getAllTransactions(): Transaction[] {
  const stmt = db.prepare(`SELECT * FROM transactions`);
  const rows = stmt.all() as any[]; // TS casting

  return rows.map(row => ({
    id: row.id,
    accountId: row.accountId,
    date: new Date(row.date),
    description: row.description,
    amount: row.amount,
    category: row.category || undefined,
    raw: JSON.parse(row.raw),
  }));
}

/**
 * Fetch all transactions for a specific account
 */
export function getTransactionsForAccount(accountId: string): Transaction[] {
  const stmt = db.prepare(`SELECT * FROM transactions WHERE accountId = ?`);
  const rows = stmt.all(accountId) as any[];

  return rows.map(row => ({
    id: row.id,
    accountId: row.accountId,
    date: new Date(row.date),
    description: row.description,
    amount: row.amount,
    category: row.category || undefined,
    raw: JSON.parse(row.raw),
  }));
}

export function insertTransactions(transactions: Transaction[]) {
  if (transactions.length === 0) return;

  const stmt = db.prepare(`
    INSERT INTO transactions (accountId, date, description, amount, category, raw)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((txs: Transaction[]) => {
    for (const tx of txs) {
      stmt.run(
        tx.accountId,
        tx.date.toISOString(),
        tx.description,
        tx.amount,
        tx.category || null,
        JSON.stringify(tx.raw)
      );
    }
  });

  insertMany(transactions);
}
