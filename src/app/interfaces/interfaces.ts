export interface User {
  uid?: string;
  name: string;
  country: string;
  incomes: number;
}
export interface Income {
  id?: string;
  source: string;
  date: string;
  income: number;
  description: string;
}
export interface Expense {
  id?: string;
  product: string;
  date: string;
  expense: number;
  category: string;
  description: string;
}

