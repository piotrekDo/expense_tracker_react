import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManageCategories, TransactionRaw } from '../model/Transaction';
import { manageCategories } from '../service/transactionHttpService';

const useManageTranCategories = () => {
    const queryClient = useQueryClient();

    return useMutation<TransactionRaw, Error, ManageCategories>({
        mutationFn: (dto: ManageCategories) => manageCategories(dto),
        onSuccess: (request, response) => {
            queryClient.invalidateQueries({
                queryKey: ['transactions-new'],
              });
        } 
    })
}

export default useManageTranCategories;