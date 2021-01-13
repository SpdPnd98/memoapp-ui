import { useState } from "react";
import { MemoProps } from "../model/memo";
import Button from "@material-ui/core/Button";
import { TextField, Card, CardContent, CardActions} from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles"

const styles = {
    root: {
        width: 200, 
    },
    
};

function EditMemoComponent(props: MemoProps) {
    const [title, setTitle] = useState<string>(props.title);
    const [body, setBody] = useState<string>(props.body);
    const [categoryId, setCategoryId] = useState<number>(props.category_id);
    const [memoboardId, setMemoboardId] = useState<number>(props.memoboard_id);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" 
                    + props.memoboard_id.toString() + "/memos/"
                    + props.id;

        if(title.length === 0 || body.length === 0) {
            //show popup "create proper memo!"
            console.log("error in update")
            return;
        }
        const payload = {
            id: props.id,
            title: title,
            body: body.replace(/\n/g, "<br></br>"),
            category_id: categoryId,
            memoboard_id: memoboardId,
        }

        // console.log(payload);
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

    const renderUpdateButton = () => {

        // console.log(title !== "" && body !== "");
        return (
            <Button type="submit" 
                disabled={!(title !== "" 
                && body !== "")}>
            
                Update Memo
                
            </Button>
        );
    }

    const renderCancelButton = () => {

        // console.log(title !== "" && body !== "");
        return (
            <div onClick={() => props.update_parent()}>
                <Button >
                    Cancel
                </Button>
            </div>
            
        );
    }

    return (
        <Card variant="outlined" className={props.classes.root}>
            <form onSubmit={event => handleSubmit(event)}>
                <CardContent>
                    <TextField
                        type="text"
                        name="title"
                        id="memoTitle"
                        label="Title"
                        onChange={e => setTitle(e.target.value)}
                        value = {title}
                        ></TextField>
                </CardContent>
                <CardContent>
                    <TextField
                        multiline
                        rows={5}
                        name="body"
                        id="memoBody"
                        label="Body"
                        onChange={e => setBody(e.target.value)}
                        value={body}
                        />
                </CardContent>
                <CardActions>
                    {renderUpdateButton()}
                    {renderCancelButton()}
                </CardActions>
            </form>
        </Card>
    );
}

export default withStyles((theme: Theme) => styles)(EditMemoComponent);