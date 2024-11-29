import { useQuery } from '@tanstack/react-query';
import { fetchReport } from '../service/transactionHttpService';
import { TransactionQueryResult, TransactionQueryResultRaw } from '../model/Transaction';
import { Report } from '../model/Report';

const useReport = (from: string, to: string) => {
  return useQuery<Report, Error>({
    queryKey: ['report'],
    queryFn: ({ signal }) =>
      fetchReport(from, to, signal).then(reportRaw => {
        const reportFormatted: Report = {
          ...reportRaw,
          from: new Date(reportRaw.from),
          to: new Date(reportRaw.to),
          summary: getSummaryFormatted(reportRaw.summary),
        };

        return reportFormatted;
      }),
  });
};

export default useReport;

export const getSummaryFormatted = (summary: TransactionQueryResultRaw): TransactionQueryResult => {
  return {
    ...summary,
    data: summary.data.map(tran => ({
      ...tran,
      tranDate: new Date(tran.tranDate),
    })),
  };
};
