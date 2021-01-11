import { MemoProps } from "./memo";
// import { RouteComponentProps } from "react-router-dom";

export type MemosProps = {
    memos: MemoProps[];
}

export type MemosState = {
    isLoaded: boolean;
    memos: MemoProps[];
}