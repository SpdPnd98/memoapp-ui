import { useEffect, useState } from "react";
import { MemosProps } from "../model/memos";
import { MemoProps } from "../model/memo";
import NewMemo from "./newMemo";
import Memo from "./memo";
import { URL, NOMEMO } from "../resources/constants";
import { CategoryProps } from "../model/category";
import CategoryFilter from "./categoryFilter";

import Masonry from "react-masonry-component";
export default function Memos(props:MemosProps) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<boolean>(false); // this bool is to trigger rerendering
    const [memos, setMemos] = useState<MemoProps[]>([]);
    const [isEditGroup, setIsEditGroup] = useState<boolean>(false);
    const [editingId, setIsEditingId] = useState<number>(NOMEMO);
    const [categories, setCategories] = useState(props.categories);
    const [filter, setFilter] = useState<Array<any>>(props.categories);

    const defaultCategory = categories === undefined 
    ? {
        id: 1,
        name: "Uncategorized",
        color: "#FFFFFF",
    }
    : categories[0];

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

    const applyFilter = (response: Array<number>) => {
        const categoriesToSee = response.length === 0 
            ? categories.map((category: CategoryProps) => category.id) // no filter applied 
            : response; // apply filter
        const categoryFilter = (category: CategoryProps) => {
            const result = categoriesToSee.filter((filterId : number) => category.id === filterId);
            return result.length > 0;
        }
        const result = categories.filter(categoryFilter);
        setFilter(result);
    }

    const editFilter = () => {
        // spawn a filter?

        // console.log("categories are: " + JSON.stringify(categories));
        return ( <CategoryFilter
            categories={categories}
            update_filter={applyFilter} />
        );
    }

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
        if (filter === []) {
            console.log("No filter applied!");
            return categories.filter(
                (category : any) => category.id === id)[0]
        } else {
            // console.log(JSON.stringify(filter));
            return filter.filter(
                (category : any) => category.id === id)[0]
        }
        
    }

    const parseMemo = (memo: MemoProps, editing: boolean) => {
        // parse each memo item
        const category = findCategory(memo.category_id);
        if (category === undefined) return; // no need to show if it doesn't belong to any category
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
                category_update = {handleCategoryUpdate}
                />
            // </li>
            
        );
    };

    const handleCategoryUpdate = (event: any) => {
        props.update_categories(event);
        setCategories(event);
    }

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
                            <NewMemo
                                id = {editingId} 
                                title={""}
                                body={""}
                                memoboard_id = {props.memoboard_id} 
                                update_parent  = {updateMemos}

                                category_id={defaultCategory.id}
                                category_color = {defaultCategory.color}
                                category_name = {defaultCategory.name}
                                category_update = {handleCategoryUpdate}
                                categories = {categories} />
                        );
    
    const masonryOptions = {
        columnWidth: 1,
        transitionDuration: 1,
    }

    if(isLoaded || isReload) {
        if(memos.length === 0) {
            return (
                <>
                {editFilter()}
                {newMemoFrame}
                <Masonry
                    options={masonryOptions}>
                    {/* <p>You do not have any memos yet.</p> */}
                </Masonry>
                </>
            );
        }
        const allMemos = memos.map((memo:MemoProps) => parseMemo(memo, memo.id === editingId ? isEditGroup : false));
        return (
            <div
           
            >{editFilter()}
                {newMemoFrame}
                <Masonry
                    options={masonryOptions}>
                    {allMemos}
                </Masonry>
            </div>
        );
        
    } else {
        return (loading());
            
    }
}