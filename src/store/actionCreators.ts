import { Dispatch } from "redux";
import { AppActions, ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY, SET_CATEGORIES } from "../model/actionTypes";
import { CategoryProps, NewCategoryFormProps } from "../model/category";
import { AppState } from "./configureStore";

export function addCategory(category: NewCategoryFormProps): AppActions {
    return {
        type: ADD_CATEGORY,
        category,
    }
}

export function removeCategory(category: CategoryProps): AppActions {
    return {
        type: REMOVE_CATEGORY,
        id: category.id, // if have troubles keeping track, change to just id
    }
}

export function setCategories(categories: CategoryProps[]): AppActions {
    return {
        type: SET_CATEGORIES,
        categories,
    }
}

export function updateCategory(category: NewCategoryFormProps): AppActions{
    return {
        type: UPDATE_CATEGORY,
        category,
    }
}

export const startAddCategory = (payload: NewCategoryFormProps) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(
            addCategory(payload)
        ) 
    };
}

export const startUpdateCategory = (payload: NewCategoryFormProps) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(
            updateCategory(payload)
        ) 
    };
}

export const startRemoveCategory = (payload: NewCategoryFormProps) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(
            removeCategory(payload as CategoryProps) // this is ok, since the form maybe doesn't have id
        ) 
    };
}

export const startSetCategories = (payload: CategoryProps[]) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch(
            setCategories(payload)
        ) 
    };
}