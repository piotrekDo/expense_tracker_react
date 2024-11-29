import { AxiosResponse } from 'axios';
import APIclient from './apiClient';
import { ManageCategories, TransactionQueryResultRaw, TransactionRaw } from '../model/Transaction';
import { ReportRaw } from '../model/Report';

const TRAN_ENDPOINT = '/api/v1/transactions';

export const fetchTransactions = (from: string, to: string, signal?: AbortSignal) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/all', {
    signal,
    params: {
      from: from,
      to: to,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchNewTransactions = (from: string, to: string, signal?: AbortSignal) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/all-no-categories', {
    signal,
    params: {
      from: from,
      to: to,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchTransactionBySystemId = (id: number, signal?: AbortSignal) => {
  return APIclient.get<TransactionRaw>(TRAN_ENDPOINT + '/by-id', {
    signal,
    params: {
      id: id,
    },
  }).then((res: AxiosResponse<TransactionRaw>) => res.data);
};

export const fetchTransactionsByKnownVendor = (vendorKey: string, from: string, to: string, signal?: AbortSignal) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/by-vendor', {
    signal,
    params: {
      vendorKey: vendorKey,
      from: from,
      to: to,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchTransactionsByCategories = (from: string, to: string, categories: number[], signal?: AbortSignal) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/by-categories', {
    signal,
    params: {
      from: from,
      to: to,
      categories: categories,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchTransactionsByGroup = (from: string, to: string, group: number, signal?: AbortSignal) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/by-group', {
    signal,
    params: {
      from: from,
      to: to,
      group: group,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchTransactionsByCriteria = (
  from: string | undefined,
  to: string | undefined,
  merchantDataValue: string | undefined,
  title: string | undefined,
  minAmount: number | undefined,
  maxAmount: number | undefined,
  signal?: AbortSignal
) => {
  return APIclient.get<TransactionQueryResultRaw>(TRAN_ENDPOINT + '/by-criteria', {
    signal,
    params: {
      from: from,
      to: to,
      merchantDataValue: merchantDataValue,
      title: title,
      minAmount: minAmount,
      maxAmount: maxAmount,
    },
  }).then((res: AxiosResponse<TransactionQueryResultRaw>) => res.data);
};

export const fetchReport = (from: string, to: string, signal?: AbortSignal) => {
  return APIclient.get<ReportRaw>(TRAN_ENDPOINT + '/report', {
    signal,
    params: {
      from: from,
      to: to,
    },
  }).then((res: AxiosResponse<ReportRaw>) => res.data);
};

export const manageCategories = (dto: ManageCategories) => {
  return APIclient.post(TRAN_ENDPOINT + '/manage-categories', dto).then(
    (res: AxiosResponse<TransactionRaw>) => res.data
  );
};
