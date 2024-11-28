import { useQuery } from '@tanstack/react-query';
import { Category } from '../model/Category';
import { fetchCategories } from '../service/categoryHttpService';

const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => fetchCategories(signal),
  });
};

export default useCategories;
