import { CategoryActionTypes } from "../model/actionTypes";
import { ADD_CATEGORY, REMOVE_CATEGORY, SET_CATEGORIES, UPDATE_CATEGORY } from "../model/actionTypes";
import { CategoryProps } from "../model/category";

const initialState: CategoryProps[] = [];

const categoryReducer = (
    state = initialState,
    action: CategoryActionTypes
) : CategoryProps[] => {
    switch (action.type) {
        case ADD_CATEGORY:
            const newCategory = {
                id: action.category.id === undefined ? 0 : action.category.id,
                name: action.category.name,
                color: action.category.color,
            }
            return [...state, newCategory]
        case REMOVE_CATEGORY:
            return  state.filter(
                category => category.id !== action.id);
        case SET_CATEGORIES:
            const allCategories = action.categories;
            return allCategories;
        case UPDATE_CATEGORY:
            const updatedCategory: CategoryProps[] = state.map((category: CategoryProps) => {
                if(category.id === action.category.id) {
                    return {
                        ...category,
                        ...action.category
                    };
                } else {
                    return category;
                }   
            });
            return updatedCategory;
        default:
            return state;
    }
}

// export function fetchCategories () {
//     const urlCategories = URL + "/v1/categories";
//             fetch (urlCategories)
//                 .then(response => {
//                     if(response.ok) {
//                         // console.log(urlCategories);
//                         // console.log(response.text());
//                         return response.json();
//                     }
//                     // console.log(response.text());
//                     throw new Error("Network was not ok.")
//                 })
//                 .then((response : any) => {
//                     return response as CategoryProps[];

//                 })
//                 .catch(() => console.log("Error in categories"));
// }

export default categoryReducer;