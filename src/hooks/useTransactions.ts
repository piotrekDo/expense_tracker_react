import { useQuery } from '@tanstack/react-query';
import { TransactionQueryResult } from '../model/Transaction';
import { fetchTransactions } from '../service/transactionHttpService';
import { getSummaryFormatted } from './useReport';

const useTransactions = (from: string, to: string) => {
  return useQuery<TransactionQueryResult, Error>({
    queryKey: ['transactions-new'],
    queryFn: ({ signal }) => fetchTransactions(from, to, signal).then(res => getSummaryFormatted(res)),
  });
};

export default useTransactions;