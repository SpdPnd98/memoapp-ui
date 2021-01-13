import { useState, useEffect} from "react";
import { NewMemoProps } from "../model/memo";
import Button from "@material-ui/core/Button";
import { TextField, Card, CardContent, CardActions} from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles"

const styles = {
    root: {
        width: 200, 
    },
    
};

function NewMemoComponent(props: NewMemoProps) {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(1);
    const [memoboardId, setMemoboardId] = useState<number>(1);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" + props.memoboard_id.toString() +"/memos";

        if(title.length === 0 || body.length === 0) {
            //show popup "create proper memo!"
            console.log("error in creation")
            return;
        }
        const payload = {
            title: title,
            body: body.replace(/\n/g, "<br></br>"),
            category_id: categoryId,
            memoboard_id: memoboardId,
        }

        // console.log(payload);
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
                setTitle("");
                setBody("");
                props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }

    const renderButton = () => {

        // console.log(title !== "" && body !== "");
        return (
            <Button type="submit" 
                disabled={!(title !== "" 
                && body !== "") }
                >
            
                Add Memo
                
            </Button>
        );
    }

    const updateMemo = () => {
        props.update_parent({id: 0, editing: false});
    }

    return (
        <div >
            <Card variant="outlined" className={props.classes.root} onClick={updateMemo}>
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
                    {renderButton()}
                </CardActions>
            </form>
        </Card>
        </div>
    );
}

export default withStyles((theme: Theme) => styles)(NewMemoComponent);