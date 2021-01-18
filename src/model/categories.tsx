import Categories from "../resources/categories";
import { CategoryProps } from "./category";


export type CategoriesDropDownProps = {
    categories: Array<any>;
    update_categories: Function;
    active_category: number;
    update_memo: Function;
}