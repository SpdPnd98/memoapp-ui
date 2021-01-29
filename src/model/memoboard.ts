import { MemoboardsProps } from "./memoboards";

export type MemoboardProps = {
    memoboard_name?: string;
    id?: number;
};

export type NewMemoboardProps = {
    memoboard_name?: string;
    id?: number;

    update_parent: Function;
    spawn_dialog: Function;
    active?: boolean;
}