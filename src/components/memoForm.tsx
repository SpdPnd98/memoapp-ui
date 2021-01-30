import { CSSProperties, useState } from "react";
import { MemoFormProps } from "../model/memo";
import Button from "@material-ui/core/Button";
import { TextField, Card, CardContent, CardActions, Box} from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles"
import { styles } from "../resources/styles";
import CategoryDropDown from "./categoryDropDown";
import { NEWMEMO } from "../resources/constants";


function MemoFormComponent(props: MemoFormProps) {
    const [title, setTitle] = useState<string>(props.title);
    const [body, setBody] = useState<string>(props.body);
    const [categoryId, setCategoryId] = useState<number>(props.category_id);
    const [memoboardId, setMemoboardId] = useState<number>(props.memoboard_id);
    const [color, setColor] = useState<string>(props.category_color);

    const payload = props.id === undefined ? 
    {
        title: title,
        body: body.replace(/\n/g, "<br></br>"),
        category_id: categoryId,
        memoboard_id: memoboardId,
    } : 
    {
        id: props.id,
        title: title,
        body: body.replace(/\n/g, "<br></br>"),
        category_id: categoryId,
        memoboard_id: memoboardId,
    }

    const renderUpdateButton = () => {

        // console.log(title !== "" && body !== "");
        return (
            <Button type="submit" 
                disabled={!(title !== "" 
                && body !== "")}>
            
                {props.text}
                
            </Button>
        );
    }

    const renderCancelButton = () => {

        // console.log(title !== "" && body !== "");
        return (
            <>
                <Button onClick={() => props.update_parent({id: props.id, editing:false})}>
                    Cancel
                </Button>
            </>
            
        );
    }

    const resetInput = () => {
        setTitle("");
        setBody("");
    }

    const handleSubmit = (event: any, payload: any) => {
        props.handle_submit(event, payload);
        // await (ms => new Promise(resolve => setTimeout(resolve, ms)))(300);
        resetInput();
    }

    const updateMemo = (index: number) => {
        setMemoboardId(props.memoboard_id); // change to a new component when able to create multiple memobaords
        setCategoryId(index);
        setColor(props.categories.filter((category: any) => category.id === index)[0].color);
    }

    const formColorStyle: CSSProperties = props.id === NEWMEMO 
    ? {
        background: color,
        width: "100%",
        margin: "2% 0 1% 0",
    }
    : {
        background: color,
        margin: "2% 0 1% 0",
    }

    const boxSizeStyle: CSSProperties = props.id === NEWMEMO
    ? {width: "87.5%",} : {width: "100%"};

    return (
        <div>
            <Box boxShadow={3} style={boxSizeStyle}>
                <Card variant="outlined" className={props.classes.root} style={formColorStyle} >
                    <form onSubmit={event => handleSubmit(event, payload)}>
                        <CardContent>
                            <TextField
                                type="text"
                                name="title"
                                id="memoTitle"
                                label="Title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                fullWidth={true}
                                focused={props.id === NEWMEMO}
                                ></TextField>
                        </CardContent>
                        <CardContent>
                            <TextField
                                multiline
                                rows={5}
                                fullWidth={true}
                                name="body"
                                id="memoBody"
                                label="Body"
                                onChange={e => setBody(e.target.value)}
                                value={body}
                                />
                        </CardContent>
                        <CardActions 
                            className={props.classes.formDiv}
                            >
                            {renderUpdateButton()}
                            {renderCancelButton()}
                            <CategoryDropDown 
                                categories={props.categories}
                                update_categories={props.category_update}
                                active_category={props.category_id} 
                                update_memo={updateMemo}/>
                        </CardActions>
                    </form>
                </Card>
            </Box>
        </div>
    );
}

export default withStyles((theme: Theme) => styles)(MemoFormComponent);