import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryGroup, ManageGroupRequest } from '../model/Category';
import { manageCategoryGroup } from '../service/categoryGroupHttpService';



const useManageCategoryGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryGroup, Error, ManageGroupRequest>({
    mutationFn: (req: ManageGroupRequest) => manageCategoryGroup(req),
    onSuccess: (request, response) => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
      });
    },
  });
};

export default useManageCategoryGroup;
