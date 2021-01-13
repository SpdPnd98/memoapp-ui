import { useEffect, useState } from "react";
import { MemosProps } from "../model/memos";
import { MemoProps } from "../model/memo";
import NewMemo from "./newMemo";
import Memo from "./memo";
import { URL } from "../resources/constants";

import Masonry from "react-masonry-component";

export default function Memos(props:MemosProps) {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<boolean>(false);
    const [memos, setMemos] = useState<MemoProps[]>([]);
    const loading = () => {
        return (
            <div>
                <p>Loading Memos...</p>
            </div>
        );
    }

    const errorDialog = () => {
        console.log("There was a problem with the request for your memos");
        // return (
        //     <p>There was a problem with the request for your memos.</p>
        // )
    }

    const updateMemos = (response: any) => {
        console.log("updating array...");
        console.log(JSON.stringify(response));
        setIsReload(true);
        setMemos(response.memos);
    }

    const parseMemo = (memo: MemoProps) => {
        // parse each memo item
        return (
            // <li>
                <Memo 
                id={memo.id}
                title={memo.title}
                body={memo.body}
                category_id={memo.category_id}
                memoboard_id={memo.memoboard_id}
                update_parent={updateMemos} />
            // </li>
            
        );
    }

    useEffect(() => {
        //fetch all memos
        const url = URL + "/v1/memoboards/" + props.memoboard_id + "/memos";
        console.log(url);
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Network is not ok.");
            })
            .then(response => {
                console.log(JSON.stringify(response));
                if(isLoaded) {
                    console.log("Memos have already been loaded.");
                } else {
                    setIsLoaded(true);
                    setIsReload(false);
                    setMemos(response.memos);
                }
            })
            .catch(errorDialog);
    }, [memos]);

    const newMemoFrame = (
                            <NewMemo memoboard_id = {props.memoboard_id} 
                                     update_parent  = {updateMemos} />
                        );
    
    const masonryOptions = {
        columnWidth: 1,
        transitionDuration: 0,
    }

    if(isLoaded || isReload) {
        if(memos.length === 0) {
            return (
                <Masonry
                    options={masonryOptions}>
                    {newMemoFrame}
                    {/* <p>You do not have any memos yet.</p> */}
                </Masonry>
            );
        }
        const allMemos = memos.map((memo:MemoProps) => parseMemo(memo));
        return (
            <Masonry
                options={masonryOptions}>
                {newMemoFrame}
                {allMemos}
            </Masonry>
        );
        
    } else {
        return (loading());
            
    }
}