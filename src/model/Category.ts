export interface Category {
  id: number;
  name: string;
}

export interface CategoryGroup {
  categoryGroupId: number;
  categoryGroupName: string;
  categories: Category[];
}

export interface ManageGroupRequest {
  groupId: number;
  categories: number[];
}