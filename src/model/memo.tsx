import { PropTypes } from "@material-ui/core"

export type MemoProps = {
    id: number; // this is the reason MemoProps has to be different from newMemoProps
    title: string;
    body: string;
    category_id: number;
    memoboard_id: number;
    update_parent: Function;
    classes: any;
}

export type NewMemoProps = {
    title?: string;
    body?: string;
    category_id?: number;
    memoboard_id: number;
    update_parent: Function;
    classes: any;
}