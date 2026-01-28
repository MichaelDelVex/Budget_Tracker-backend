export interface Transaction {
  id?: string;
  accountId: string;
  date: Date;
  description: string;
  amount: number;
  category?: string;    
  raw: Record<string, string>; // original CSV row
}