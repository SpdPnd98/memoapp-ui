import { NewMemoProps } from "../model/memo";
import MemoForm from "./memoForm";
import { withStyles, Theme } from "@material-ui/core/styles"
import { styles } from "../resources/styles";


function NewMemoComponent(props: NewMemoProps) {
    const handleSubmit = (event: any, payload: any) => {
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" 
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
                props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }

    return (
        <MemoForm 
                title={""}
                body={""}
                memoboard_id={props.memoboard_id}
                update_parent={props.update_parent}
                handle_submit = {handleSubmit}
                editing={false}
                text={"Add Memo"}

                category_id={props.category_id}
                category_color={props.category_color}
                category_name={props.category_name}
                categories = {props.categories}
                category_update = {props.category_update} />
    )
}

export default withStyles((theme: Theme) => styles)(NewMemoComponent);