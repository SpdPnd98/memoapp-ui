import { MemoProps } from "./memo";
// import { RouteComponentProps } from "react-router-dom";

export type MemosProps = {
    memoboard_id: number;
}

export type MemosState = {
    isLoaded: boolean;
    memos: MemoProps[];
}