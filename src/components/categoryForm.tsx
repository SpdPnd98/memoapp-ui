import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@material-ui/core";
import { Color, ColorBox, ColorButton } from "material-ui-color";
import { CategoryFormProps } from "../model/category";
import { URL } from "../resources/constants";

export default function CategoryForm (props: CategoryFormProps) {
    // const [open, setOpen] = useState<boolean>(true);
    const [name, setName] = useState<string>(props.name);
    const [color, setColor] = useState<string>(props.color);
    const payload = props.id === undefined ? 
    {
        name: name,
        color: color,
    } :
    {
        id : props.id,
        name: name,
        color: color,
    }

    const colorVerify = (color: string) => {
        if(color.charAt(0)!== "#" || color.length !== 7) {
            console.log("Color not available: Format should be #FFFFFF");
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        // console.log(event);
        props.update_parent(payload);
        console.log("Color change sucessful");
    }

    const handleClose = () => {
        console.log("Color change canceled");
        props.close_form();
    }

    const handleColorChange = (newValue : Color) => {
        // console.log("new color: " + newValue);
        const color = "#" + newValue.hex.toString();
        if(colorVerify(color)) setColor(color);
        return; 
    }

    const handleDelete = () => {
        const url = URL + "/v1/categories";
        fetch (url + "/" + payload.id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify(payload),
        })
        .then((response : any) => {
            if(response.ok) {
                // console.log(JSON.stringify(response.json()));
                return response.json();
            }
            // console.log(response.text());
            throw new Error("Network was not ok.")
        })
        .then((response: any) => {
            props.close_form();
        })
        .catch(() => {console.log("Error while deleting category...")});
    }

    const spawnButtons = () => {
        const confirm = (<Button onClick={handleSubmit}>
                            Confirm
                         </Button>);
        const cancel = (<Button onClick={handleClose}>
                            Cancel
                        </Button>);
        const del = (<Button onClick={handleDelete} disabled={props.id === 1}>
                            Delete
                        </Button>);
        if (props.id === undefined) {
            return (
                <>
                {confirm}
                {cancel}
                </>
            );
        } else {
            return (
                <>
                {confirm}
                {cancel}
                {del}
                </>
            );
        }
    
    }

    return (
        <Dialog open={true} aria-labelledby="category-form-title">
            <DialogTitle id="category-form-title">
                <ColorButton color={color} />
                    {props.id === undefined ? "Add Category" : "Edit Category"}
                </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        name="name"
                        id="categoryName"
                        label="Category Name"
                        onChange={e => setName(e.currentTarget.value)}
                        value={name}
                        disabled={props.id===1 ? true : false}
                    />
                    <ColorBox value={color} onChange={handleColorChange} />
                    {spawnButtons()}
                </form>
            </DialogContent>
        </Dialog>
    );
}

// export default function CategoryForm() {return <div />};