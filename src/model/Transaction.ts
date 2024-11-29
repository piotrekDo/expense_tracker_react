import { Category } from './Category';

export interface TransactionRaw {
  tranSystemId: number;
  tranDate: string;
  merchantData: string;
  title: string;
  amount: number;
  knownVendorId: number;
  knownVendorName: string;
  categories: Category[];
}

export interface Transaction {
  tranSystemId: number;
  tranDate: Date;
  merchantData: string;
  title: string;
  amount: number;
  knownVendorId: number;
  knownVendorName: string;
  categories: Category[];
}

export interface TransactionQueryResultRaw {
  quantity: number;
  minValue: number;
  maxValue: number;
  debits: number;
  credits: number;
  debitsSum: number;
  creditsSum: number;
  difference: number;
  merchantCount: number;
  data: TransactionRaw[];
  merchants: string[];
}

export interface TransactionQueryResult {
  quantity: number;
  minValue: number;
  maxValue: number;
  debits: number;
  credits: number;
  debitsSum: number;
  creditsSum: number;
  difference: number;
  merchantCount: number;
  data: Transaction[];
  merchants: string[];
}

export interface ManageCategories {
  transaction: number;
  categories: number[];
}