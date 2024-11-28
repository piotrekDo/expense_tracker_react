import { AxiosResponse } from 'axios';
import { CategoryGroup, ManageGroupRequest } from '../model/Category';
import APIclient from './apiClient';

const CATEGORY_GROUP_ENDPOINT = '/api/v1/category-groups';

export const fetchCategoryGroups = (signal?: AbortSignal) => {
  return APIclient.get<CategoryGroup[]>(CATEGORY_GROUP_ENDPOINT + '/all', { signal }).then(
    (res: AxiosResponse<CategoryGroup[]>) => res.data
  );
};

export const postNewCategoryGroup = (name: string) => {
  return APIclient.post(CATEGORY_GROUP_ENDPOINT + '/new', null, {
    params: {
      name: name,
    },
  }).then((res: AxiosResponse<CategoryGroup>) => res.data);
};

export const manageCategoryGroup = (request: ManageGroupRequest) => {
  return APIclient.post(CATEGORY_GROUP_ENDPOINT + '/manage-group', request)
  .then((res: AxiosResponse<CategoryGroup>) => res.data);
};
