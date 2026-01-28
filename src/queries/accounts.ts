import { db } from "../db";

/**
 * Returns all unique accountIds in the transactions table
 */
export function getAllAccountIds(): string[] {
  const stmt = db.prepare(`SELECT DISTINCT accountId FROM transactions`);

  // Cast to the correct row type
  const rows = stmt.all() as { accountId: string }[];

  // Map to string array
  return rows.map(row => row.accountId);
}
