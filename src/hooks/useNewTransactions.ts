import { useQuery } from '@tanstack/react-query';
import { TransactionQueryResult } from '../model/Transaction';
import { fetchNewTransactions } from '../service/transactionHttpService';
import { getSummaryFormatted } from './useReport';

const useNewTransactions = (from: string, to: string) => {
  return useQuery<TransactionQueryResult, Error>({
    queryKey: ['transactions-new'],
    queryFn: ({ signal }) => fetchNewTransactions(from, to, signal).then(res => getSummaryFormatted(res)),
  });
};

export default useNewTransactions;
