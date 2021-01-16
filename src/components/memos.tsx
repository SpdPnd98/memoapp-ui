import { useEffect, useState } from "react";
import { MemosProps } from "../model/memos";
import { MemoProps } from "../model/memo";
import NewMemo from "./newMemo";
import Memo from "./memo";
import { URL } from "../resources/constants";

import Masonry from "react-masonry-component";
import { CategoriesProps } from "../model/categories";

export default function Memos(props:MemosProps) {
    const defaultCategory = {
        id: 1,
        name: "Uncategorized",
        color: "#FFFFFF",
    }
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<boolean>(false); // this bool is to trigger rerendering
    const [memos, setMemos] = useState<MemoProps[]>([]);
    const [isEditGroup, setIsEditGroup] = useState<boolean>(false);
    const [editingId, setIsEditingId] = useState<number>(0);
    const [categories, setCategories] = useState(props.categories);
    const loading = () => {
        return (
            <div>
                <p>Loading Memos...</p>
            </div>
        );
    };

    const errorDialog = () => {
        console.log("There was a problem with the request for your memos");
    };

    const updateMemos = (response: any) => {
        console.log("updating array...");
        console.log(JSON.stringify(response));
        if(response.memos === undefined ) {
            if (response.id !== undefined && response.editing !== undefined) {
                setIsEditingId(response.id);
                setIsEditGroup(response.editing);
                setIsReload(!isReload);
            } else {
                console.log("There seems to be some error with passing things around");
            }
        } else {
            setMemos(response.memos);
            setIsEditingId(0);
            setIsEditGroup(false);
        }
    };

    const findCategory = (id: number) => {
        // returns the first category from the categories with the assoc id
        if (categories.length === 0) {
            console.log("problems with category...")
            return defaultCategory;
        } else {
            // console.log(categories);
            return categories.filter(
                (category : any) => category.id === id)[0]
        }
        
    }

    const parseMemo = (memo: MemoProps, editing: boolean) => {
        // parse each memo item
        const category = findCategory(memo.category_id);
        return (
            // <li>
                <Memo 
                id={memo.id}
                title={memo.title}
                body={memo.body}
                memoboard_id={memo.memoboard_id}
                update_parent={updateMemos} 
                editing={editing}
                key={memo.id}

                category_id={category.id}
                category_color = {category.color}
                category_name = {category.name}
                categories = {categories}
                category_update = {props.update_categories}
                />
            // </li>
            
        );
    };

    useEffect(() => {
        //fetch all memos
        if (!isLoaded) {
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
                    // console.log(JSON.stringify(response));
                    if(isLoaded) {
                        console.log("Memos have already been loaded.");
                    } else {
                        setIsLoaded(true);
                        setIsReload(false);
                        setMemos(response.memos);
                    }
                })
                .catch(errorDialog);    
        }
    }, [memos, editingId]);

    const newMemoFrame = (
                            <NewMemo title={""} body={""}
                                     memoboard_id = {props.memoboard_id} 
                                     update_parent  = {updateMemos}

                                     category_id={defaultCategory.id}
                                     category_color = {defaultCategory.color}
                                     category_name = {defaultCategory.name}
                                     category_update = {props.update_categories}
                                     categories = {props.categories} />
                        );
    
    const masonryOptions = {
        columnWidth: 1,
        transitionDuration: 2,
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
        const allMemos = memos.map((memo:MemoProps) => parseMemo(memo, memo.id === editingId ? isEditGroup : false));
        return (
            <div>
                <Masonry
                    options={masonryOptions}>
                    {newMemoFrame}
                    {allMemos}
                </Masonry>
            </div>
        );
        
    } else {
        return (loading());
            
    }
}