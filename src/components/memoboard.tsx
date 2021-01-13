import { useState, useEffect } from "react";
import {MemoboardProps} from "../model/memoboard";
import Memos from "./memos";

export default function Memoboard(props: MemoboardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const loading = () => {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    useEffect(() => {
        setIsLoaded(true);
    })


    if(isLoaded){
        return (
        <div>
            <h1>{props.memoboard_name}</h1>
            <p>Switch a memoboard:</p>
            <Memos memoboard_id={props.id}/>
        </div>
        );
    } else {
        return loading();
    }
}