import { useState, useEffect} from "react";
import { NewMemoProps, MemoState } from "../model/memo";
import Button from "@material-ui/core/Button";
import { TextField, Card, CardContent, CardActions } from "@material-ui/core";

export default function NewMemo(props: NewMemoProps) {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(1);
    const [memoboardId, setMemoboardId] = useState<number>(1);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" + props.memoboard_id.toString() +"/memos";

        if(title.length === 0 || body.length === 0) {
            //show popup "create proper memo!"
            return;
        }
        const payload = {
            title,
            body: body.replace(/\n/g, "<br></br>"),
            categoryId,
            memoboardId,
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
                props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }

    const renderButton = () => {

        console.log(title !== "" && body !== "");
        return (
            <Button type="submit" 
                disabled={!(title !== "" 
                && body !== "") }>
            
                Add Memo
                
            </Button>
        );
    }

    return (
        <Card variant="outlined">
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
    );
}