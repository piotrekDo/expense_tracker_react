import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryGroup } from '../model/Category';
import { postNewCategoryGroup } from '../service/categoryGroupHttpService';

const useNewCategoryGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryGroup, Error, string>({
    mutationFn: (name: string) => postNewCategoryGroup(name),
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['groups'],
      });
    },
  });
};

export default useNewCategoryGroup;
