import { useState } from "react";
import { CategoriesDropDownProps } from "../model/categories";
import { CategoryProps } from "../model/category";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function CategoryDropDown (props: CategoriesDropDownProps) {
    const [categories, setCategories] = useState(props.categories);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const generateDropDown = () => {
        const allCatDrops = generateDropItems();
        return(
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="category-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
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
                    <MenuItem onClick={handleCreation} 
                        style={{
                            background: categories[0].color,
                        } as CSSProperties}>
                        Add Category
                    </MenuItem>  
                        {allCatDrops}
                </Menu>
            </div>
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
        console.log(index);
        props.update_memo(index);
    };

    const handleCreation = (event: any) => {
        setAnchorEl(null);
        console.log("create new soon!");
    };

    const generateDropItems = () => {
        console.log(JSON.stringify(categories));
        const itemStyle = ((category: CategoryProps) => {
            return {
                background: category.color,
            } as CSSProperties;
        });
        return (
            categories.map((category : any, index : number) => {
                return(
                    <MenuItem onClick={(event) => handleCategorySelected(event, index + 1)} 
                        style={itemStyle(category)}>
                        {category.name}
                    </MenuItem>   
                )
            })
        );
    }

    const updateCategory = (category: CategoryProps) => {
        const url = URL + "/v1/categories";
        fetch (url + "/" + category.id, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify(category),
        })
        .then((response : any) => {
            if(response.ok) {
                console.log(JSON.stringify(response.json()));
                setCategories(response.json());
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
        .catch(() => console.log("Error in updating categories"));
    }
    return generateDropDown();
};