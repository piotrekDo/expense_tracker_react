import { useQuery } from '@tanstack/react-query';
import { CategoryGroup } from '../model/Category';
import { fetchCategoryGroups } from '../service/categoryGroupHttpService';

const useCategoryGroups = () => {
  return useQuery<CategoryGroup[], Error>({
    queryKey: ['groups'],
    queryFn: ({ signal }) => fetchCategoryGroups(signal),
  });
};

export default useCategoryGroups;
