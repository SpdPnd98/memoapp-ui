import { useState } from "react";
import { CategoriesDropDownProps } from "../model/categories";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewCategory from "./newCategory";
import { ColorButton } from "material-ui-color";
import EditCategory from "./editCategory";
import { CategoryProps } from "../model/category";

export default function CategoryDropDown (props: CategoriesDropDownProps) {
    const [categories, setCategories] = useState(props.categories);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [categoryFormNew, setCategoryFormNew] = useState<boolean>(false);
    const [categotyFormEdit, setCategoryFormEdit] = useState<boolean>(false);

    const [category, setCategory] = useState<CategoryProps | undefined>();

    const generateDropDown = () => {
        const allCatDrops = generateDropItems();
        return(
               <>
                <IconButton
                    aria-label="more"
                    aria-controls="category-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    // style={{alignContent: "flex-end",} as CSSProperties}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="category-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        {allCatDrops}
                    <MenuItem onClick={handleCreation} 
                        style={{
                            background: "#eaeaea",
                        } as CSSProperties}>
                        Add Category...
                    </MenuItem>  
                </Menu>
            </>
        );
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCategorySelected = (event: any, index: number) => {
        setAnchorEl(null);
        // console.log(index);
        props.update_memo(index);
    };

    const handleEditColor = (event: any, category: any) => {
        setAnchorEl(null);
        setCategory(category);
        setCategoryFormEdit(true);
    };

    const handleCreation = (event: any) => {
        setAnchorEl(null);
        setCategoryFormNew(true);
        console.log("create new soon!");
    };

    const handleUpdateCategories = (event:any) => {
        props.update_categories(event);
        setCategories(event);
    }

    const generateDropItems = () => {
        // console.log(JSON.stringify(categories));
        // const itemStyle = ((category: CategoryProps) => {
        //     return {
        //         background: category.color,
        //     } as CSSProperties;
        // });
        return (
            categories.map((category : CategoryProps) => {
                return(
                    <MenuItem  
                        // style={itemStyle(category)}
                         key={category.id.toString() + "-category"}
                         onClick={(event) => handleCategorySelected(event, category.id)}>
                        <p onClick={e => {e.stopPropagation(); handleEditColor(e, category)}}><ColorButton color={category.color}/></p>
                        <p >{category.name}</p>
                    </MenuItem>   
                )
            })
        );
    }

    if(categoryFormNew) {
        return (<NewCategory 
            update_parent={setCategoryFormNew}
            update_categories={handleUpdateCategories}/>);
    } else if(categotyFormEdit && category !== undefined){
        return (<EditCategory
            id={category.id}
            name={category.name}
            color={category.color}

            update_parent={setCategoryFormEdit}
            update_categories={props.update_categories}
            />);
    }
    else{
        // console.log("launching no cat");
        return generateDropDown();
    }
};