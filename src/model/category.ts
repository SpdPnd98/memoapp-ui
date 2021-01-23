export type CategoryProps = {
    id: number;
    name: string;
    color: string;
};

export type NewCategoryProps = {
    update_parent: Function;
    update_categories: Function;
};

export type EditCategoryProps = {
    id: number;
    name: string;
    color: string;

    update_parent: Function;
    update_categories: Function;
};

export type CategoryFormProps = {
    id?: number;
    name:string;
    color:string;

    update_parent: Function;
    update_category?: Function;
    close_form: Function;
};

export interface NewCategoryFormProps { // maybe can remove categoryformprops after redux integrations
    id?: number;
    name:string;
    color:string;
};

// export type CategoryState = {
//     categories: CategoryProps[];
// }
