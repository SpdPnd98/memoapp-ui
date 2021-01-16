import Categories from "../resources/categories";
import { CategoriesProps } from "./categories";

export type MemosProps = {
    memoboard_id: number;
    categories: Array<any>;
    update_categories: Function;
}