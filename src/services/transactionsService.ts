import { getAllTransactions, getTransactionsForAccount  } from "../queries/transactions";
import { Transaction } from "../types/transactions.types";

export function getAccountSummary(accountId: string) {
  const transactions: Transaction[] = getTransactionsForAccount(accountId);
  const totalSpent = transactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncome = transactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  return {
    accountId,
    totalSpent,
    totalIncome,
    transactionCount: transactions.length
  };
}

export function getOverallSummary() {
  const transactions = getAllTransactions();

  const summaryPerAccount = Array.from(
    new Set(transactions.map(tx => tx.accountId))
  ).map(accountId => getAccountSummary(accountId));

  const overallSpent = summaryPerAccount.reduce((sum, acc) => sum + acc.totalSpent, 0);
  const overallIncome = summaryPerAccount.reduce((sum, acc) => sum + acc.totalIncome, 0);

  return {
    summaryPerAccount,
    overallSpent,
    overallIncome
  };
}
