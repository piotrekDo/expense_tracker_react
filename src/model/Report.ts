import { TransactionQueryResult, TransactionQueryResultRaw } from './Transaction';

export interface ReportRaw {
  from: string;
  to: string;
  summary: TransactionQueryResultRaw;
  groupsReport: GroupsReport[];
  categoriesReport: CategoryReport[];
}

export interface Report {
    from: string;
    to: string;
    summary: TransactionQueryResult;
    groupsReport: GroupsReport[];
    categoriesReport: CategoryReport[];
  }

export interface GroupsReport {
  id: number;
  name: string;
  transactions: number;
  sum: number;
  categoriesIncluded: CategoryReport[];
}

export interface CategoryReport {
  id: number;
  name: string;
  transactions: number;
  sum: number;
}
