export type MemoProps = {
    id: number; // this is the reason MemoProps has to be different from newMemoProps
    title?: string;
    body?: string;
    category_id?: number;
    memoboard_id: number;
    update_parent: Function;
}

export type MemoState = {
    title: string;
    body: string;
    category_id?: number;
    memoboard_id?: number;

}

export type NewMemoProps = {
    title?: string;
    body?: string;
    category_id?: number;
    memoboard_id: number;
    update_parent: Function;
}