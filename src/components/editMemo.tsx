import { useState } from "react";
import { MemoProps } from "../model/memo";
// import Button from "@material-ui/core/Button";
// import { TextField, Card, CardContent, CardActions} from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles"
import MemoForm from "./memoForm";
import { styles } from "../resources/styles";

function EditMemoComponent(props: MemoProps) {
    const [title, setTitle] = useState<string>(props.title);
    const [body, setBody] = useState<string>(props.body);
    // const [categoryId, setCategoryId] = useState<number>(props.category_id);
    // const [memoboardId, setMemoboardId] = useState<number>(props.memoboard_id);

    const handleSubmit = (event: any, payload: any) => {
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" 
                    + props.memoboard_id.toString() + "/memos/"
                    + props.id;

        if(title.length === 0 || body.length === 0) {
            //show popup "create proper memo!"
            console.log("error in update")
            return;
        }
        console.log(JSON.stringify(payload));

        fetch(url,{
            method: "PATCH",
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
                props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }

    return (<MemoForm 
                id={props.id}
                title={props.title}
                body={props.body}
                memoboard_id={props.memoboard_id}
                update_parent={props.update_parent}
                handle_submit = {handleSubmit}
                editing={true}
                text={"Update"}
                
                category_id={props.category_id}
                category_color={props.category_color}
                category_name={props.category_name}
                categories = {props.categories}
                category_update = {props.category_update} />)
}

export default withStyles((theme: Theme) => styles)(EditMemoComponent);
