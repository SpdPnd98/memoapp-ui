import { useEffect, useState } from "react";
import { MemosProps } from "../model/memos";
import { MemoProps } from "../model/memo";
import NewMemo from "./newMemo";
import Memo from "./memo";
import { URL, NOMEMO, MOBILE_WIDTH } from "../resources/constants";
import { CategoryProps } from "../model/category";
import CategoryFilter from "./categoryFilter";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

// import { useDispatch } from "react-redux";

import Masonry from "react-masonry-component";
// import { Dispatch } from "redux";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Memos: React.FC<MemosProps> = (props) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isReload, setIsReload] = useState<boolean>(false); // this bool is to trigger rerendering
    const [memos, setMemos] = useState<MemoProps[]>([]);
    const [isEditGroup, setIsEditGroup] = useState<boolean>(false);
    const [editingId, setIsEditingId] = useState<number>(NOMEMO);
    const [categories, setCategories] = useState(props.categories);
    const [filter, setFilter] = useState<Array<any>>(props.categories);
    const [deletedSnackbar, setDeletedSnackbar] = useState<boolean>(false);
    const [createdSnackbar, setCreatedSnackbar] = useState<boolean>(false);
    const [updatedSnackbar, setUpdatedSnackbar] = useState<boolean>(false);

    const [width, setWidth] = useState<number>(window.innerWidth);
    let isMobile: boolean = (width <= MOBILE_WIDTH)

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

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

    const createMemo = (response: MemoProps) => {
        setCreatedSnackbar(true);
        console.log(response);
        setMemos([...memos,
                  response]);
    }
    
    const handleCloseCreatedSnackbar = () => {
        setCreatedSnackbar(false);
    }

    const updateMemos = (response: any) => { // either use any, or specify 2 possible types. 
        //This is doubled as indication of which memo is active in edit mode
        // console.log("updating array...");
        // console.log(JSON.stringify(response));
        if( response.editing !== undefined) {
                setIsEditingId(response.id);
                setIsEditGroup(response.editing);
                setIsReload(!isReload);
        } else {
            setMemos(
                memos.map((memo: MemoProps) => memo.id !== response.id ? memo : response)
            );
            setIsEditingId(0);
            setIsEditGroup(false);
            setUpdatedSnackbar(true);
        }
    };

    const handleCloseUpdatedSnackbar = () => {
        setUpdatedSnackbar(false);
    }

    const removeMemo = (response: {id: number}) => { // removes memo from list of memos
        setMemos(memos.filter((memo: MemoProps) => memo.id !== response.id));
        setDeletedSnackbar(true);
    }

    const handleCloseDeletedSnackbar = () => {
        setDeletedSnackbar(false);
    }

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
                remove_memo={removeMemo}
                editing={editing}
                key={memo.id}
                isMobile={isMobile}

                category_id={category.id}
                category_color = {category.color}
                category_name = {category.name}
                categories = {categories}
                category_update = {handleCategoryUpdate}
                />
            // </li>
            
        );
    };

    // const dispatch: Dispatch<any> = useDispatch();
    const handleCategoryUpdate = (event: any) => {
        props.update_categories(event);
        setCategories(event);
    }

    useEffect(() => {
        if (!isLoaded) {
            //initialize memos
            const url = props.memoboard_id === undefined 
                    ? URL + "/v1/memos"
                    : URL + "/v1/memoboards/" + props.memoboard_id + "/memos" ;
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

            // get window sizes
            window.addEventListener('resize', handleWindowSizeChange);    
        }// eslint-disable-next-line
    }, [memos, editingId]);

    const newMemoFrame = (
                            <NewMemo
                                id = {editingId} 
                                title={""}
                                body={""}
                                memoboard_id = {props.memoboard_id === undefined ? 1 : props.memoboard_id} 
                                create_memo = {createMemo}
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

    const snackbarCollection = () => {
        return (
            <>
            <Snackbar open={deletedSnackbar} autoHideDuration={2000} onClose={handleCloseDeletedSnackbar}>
                <Alert severity="success" onClose={handleCloseDeletedSnackbar} >
                Memo Deleted!
                </Alert>
            </Snackbar>
            <Snackbar open={createdSnackbar} autoHideDuration={2000} onClose={handleCloseCreatedSnackbar}>
                <Alert severity="success" onClose={handleCloseCreatedSnackbar} >
                Memo Created!
                </Alert>
            </Snackbar>
            <Snackbar open={updatedSnackbar} autoHideDuration={2000} onClose={handleCloseUpdatedSnackbar}>
                <Alert severity="success" onClose={handleCloseUpdatedSnackbar} >
                Memo Updated!
                </Alert>
            </Snackbar>
            </>
        )
    }

    if(isLoaded || isReload) {
        if(memos.length === 0) {
            return (
                <>
                {editFilter()}
                {newMemoFrame}
                <Masonry
                    options={masonryOptions}>
                    <p>You do not have any memos yet.</p>
                </Masonry>
                {snackbarCollection()}
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
                {snackbarCollection()}
            </div>
        );
        
    } else {
        return (loading());
            
    }
}

export default Memos;