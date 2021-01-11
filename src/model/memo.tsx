export type MemoProps = {
    id: number;
    title?: string;
    body?: string;
    category_id?: number;
    memoboard_id: number;
}

export type MemoState = {
    title: string;
    body: string;
    category_id: number;
    memoboard_id: number;
}

export type NewMemoProps = {
    title?: string;
    body?: string;
    category_id?: number;
    memoboard_id: number;
    update_parent: Function;
}