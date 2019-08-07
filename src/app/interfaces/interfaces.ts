export interface Income {
    uid?: string;
    id?: string;
    source: string;
    date: string;
    income: number;
    description: string;
  }
export interface User {
  uid?: string;
  name: string;
  country: string;
  incomes: number;
}
