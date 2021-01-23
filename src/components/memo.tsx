import React from "react";
import {MemoProps} from "../model/memo";
import { URL } from "../resources/constants";
import EditMemo from "./editMemo";

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { withStyles, Theme } from "@material-ui/core/styles"
import { CSSProperties } from "@material-ui/styles";
import { Box } from "@material-ui/core";
// import { createStyles } from "@material-ui/styles";

const styles = {
    root: {
        width: "12%", 
        margin: "0.3%"
    },
    
};

function MemoComponent (props: MemoProps) {
    const memoColorStyle: CSSProperties = {
        background: props.category_color,
        // width: "30%",
    }

    // const [isEdit, setIsEdit] = useState(false);
    const deleteMemo = () => {
        // console.log("Wait lah");
        const url = URL + "/v1/memoboards/" + props.memoboard_id.toString() + "/memos/" + props.id.toString();
        console.log(url);
        const deletedItem = {
            id: props.id,
        }
        props.remove_memo(deletedItem);
        fetch(url,
            {
                method: "DELETE",
            })
            .then(response => {
                if (response.ok) {
                    return;
                }
                throw new Error("Error in API call!");
            })
            .then(() => {
                console.log("delete successful!");
            })
            .catch(e => {
                console.log(e.toString());
            });
        
    }

    // useEffect(() => {
    //     // console.log("editing stuff...");
    // }, [isEdit]);

    const updateMemo = () => {
        props.update_parent({id: props.id, editing: !props.editing});
    }

    if (props.editing) {
        return(
                <EditMemo
                    id={props.id}
                    title={props.title}
                    body={props.body.replaceAll("<br></br>", "\n")}
                    memoboard_id={props.memoboard_id}
                    update_parent={props.update_parent}
                    remove_memo={props.remove_memo}
                    classes={props.classes}
                    editing={true}

                    category_id={props.category_id}
                    category_color={props.category_color}
                    category_name={props.category_name}
                    categories = {props.categories}
                    category_update = {props.category_update} />
        ) 
    }
    return (
        <Box onClick={updateMemo} 
            className={props.classes.root} 
            key={props.id.toString()}
            boxShadow={3}>
            <Card  
                  variant="outlined"
                  style={memoColorStyle}
                  raised={true}
                  > 
                <CardContent >
                    <Typography variant="body1">
                        {props.title}
                    </Typography>
                    {/* <p><i>{this.props.category_id}</i></p> */}
                    <Typography variant="body2"
                        style={{wordWrap: "break-word"}}>
                        
                            {props.body.split("<br></br>").map((paragraph: String, index: number) => {
                                return (
                                    <>
                                    {paragraph}
                                    <br></br>
                                    </>
                                );
                            })}
                        
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={(e) => {e.stopPropagation(); deleteMemo();}}>
                        Delete memo
                    </Button>
                </CardActions>
            </Card>
        </Box> 
    );
}

export default withStyles((theme: Theme) => styles)(MemoComponent);