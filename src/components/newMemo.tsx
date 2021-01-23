import { TextField } from "@material-ui/core";
import { NewMemoProps } from "../model/memo";
import MemoForm from "./memoForm";
import { withStyles, Theme } from "@material-ui/core/styles"
import { styles } from "../resources/styles";
import { useState } from "react";
import { NEWMEMO } from "../resources/constants";
import { URL } from "../resources/constants";
import { CSSProperties } from "react";

function NewMemoComponent(props: NewMemoProps) {

    const [editing, setEditing] = useState<boolean>(false)

    const handleSubmit = (event: any, payload: any) => {
        event.preventDefault();
        const url = URL + "/v1/memoboards/" 
                    + props.memoboard_id.toString() +"/memos";

        console.log(payload);
        fetch(url,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("network connection error!");
            })
            .then(response => {
                //re-render the app with the reply
                setEditing(false);
                props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }
    const handleOnClick = () => {
        props.update_parent({id: NEWMEMO, editing: true});
        setEditing(true);
    }

    const updateParent = (fields: {id: number; editing: boolean;}) => {
        props.update_parent(fields);
        setEditing(false);
    }

    if(editing && props.id === NEWMEMO) {
        return (
            <MemoForm 
                    id={-1}
                    title={""}
                    body={""}
                    memoboard_id={props.memoboard_id}
                    update_parent={updateParent}
                    handle_submit = {handleSubmit}
                    editing={false}
                    text={"Add Memo"}
    
                    category_id={props.category_id}
                    category_color={props.category_color}
                    category_name={props.category_name}
                    categories = {props.categories}
                    category_update = {props.category_update} />
        )
    } else {
        return <TextField
                    onClick={handleOnClick}
                    placeholder={"Add a memo..."}
                    style={{margin: "0 0 0.3% 0"} as CSSProperties}/>
    }
    
}

export default withStyles((theme: Theme) => styles)(NewMemoComponent);