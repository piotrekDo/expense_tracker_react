import { useQuery } from '@tanstack/react-query';
import { Category } from '../model/Category';
import { fetchCategories } from '../service/categoryHttpService';

const useCategories = (enabled: boolean = true) => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => fetchCategories(signal),
    enabled: enabled
  });
};

export default useCategories;
