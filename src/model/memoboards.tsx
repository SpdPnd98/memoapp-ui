import { MemoboardProps } from "../model/memoboard";
import { RouteComponentProps } from "react-router-dom";

export interface MemoboardsProps extends RouteComponentProps {
    memoboards: MemoboardProps[];
}

export type MemoboardsState = {
    id: number;
    isLoaded: boolean;
    memoboards: MemoboardProps[];
}