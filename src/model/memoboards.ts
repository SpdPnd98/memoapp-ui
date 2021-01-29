import { RouteComponentProps } from "react-router-dom";
import { MemoboardProps } from "./memoboard";

export interface MemoboardsProps extends RouteComponentProps {
}

export type MemoboardsDropDownProps = {
    current_memoboard?: number;
    memoboards: MemoboardProps[];
    update_active_memoboard: Function;
    update_all_memoboards: Function;
}