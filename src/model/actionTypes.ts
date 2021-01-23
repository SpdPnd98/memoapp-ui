import { CategoryProps, NewCategoryFormProps } from "./category";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const UPDATE_CATEGORY = "UDPATE_CATEGORY";

export interface SetCategoriesAction {
    type: typeof SET_CATEGORIES;
    categories: CategoryProps[];
}

export interface UpdateCategoryAction {
    type: typeof UPDATE_CATEGORY;
    category: NewCategoryFormProps;
}

export interface DeleteCategoryAction {
    type: typeof REMOVE_CATEGORY;
    id: number;
}

export interface AddCategoryAction {
    type: typeof ADD_CATEGORY;
    category: NewCategoryFormProps;
}

export type CategoryActionTypes = SetCategoriesAction | UpdateCategoryAction 
                                    | DeleteCategoryAction | AddCategoryAction;

// Aggregate all action types
export type AppActions = CategoryActionTypes; 