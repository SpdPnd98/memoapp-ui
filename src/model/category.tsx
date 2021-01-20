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
    close_form: Function;
};

export type CategoryState = {
    categories: CategoryProps[];
}

export type CategoryAction = {
    type: string;
    category: CategoryProps
}