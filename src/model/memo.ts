
export type MemoProps = {
    id: number; // this is the reason MemoProps has to be different from newMemoProps
    title: string;
    body: string;
    memoboard_id: number;
    update_parent: Function;
    remove_memo: Function;
    editing?: boolean;
    
    category_id: number;
    category_color: string;
    category_name: string;
    categories: Array<any>;
    category_update: Function;
    isMobile: boolean;
}

export type NewMemoProps = {
    id: number;
    title: string;
    body: string;
    memoboard_id: number;
    update_parent: Function;
    create_memo: Function;
    classes: any;

    category_id: number;
    category_color: string;
    category_name: string;
    categories: Array<any>;
    category_update: Function;
}

export type MemoFormProps = {
    id?: number; 
    title: string;
    body: string;
    memoboard_id: number;
    update_parent: Function;
    handle_submit: Function;
    classes: any;
    editing?: boolean;
    text: string;

    category_id: number;
    category_color: string;
    category_name: string;
    categories: Array<any>;
    category_update: Function;
}