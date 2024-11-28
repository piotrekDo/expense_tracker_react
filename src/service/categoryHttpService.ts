import { AxiosResponse } from 'axios';
import APIclient from './apiClient';
import { Category } from '../model/Category';

const CATEGORY_ENDPOINT = '/api/v1/categories';

export const fetchCategories = (signal?: AbortSignal) => {
  return APIclient.get<Category[]>(CATEGORY_ENDPOINT + '/all', { signal }).then(
    (res: AxiosResponse<Category[]>) => res.data
  );
};

export const postNewCategory = (name: string) => {
  return APIclient.post(CATEGORY_ENDPOINT + '/new', null, {
    params: {
      name: name,
    },
  }).then((res: AxiosResponse<Category>) => res.data);
};
