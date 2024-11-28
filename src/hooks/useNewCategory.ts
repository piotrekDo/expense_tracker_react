import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '../model/Category';
import { postNewCategory } from '../service/categoryHttpService';

const useNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, string>({
    mutationFn: (name: string) => postNewCategory(name),
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
};

export default useNewCategory;
