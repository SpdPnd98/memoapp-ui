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
// import { createStyles } from "@material-ui/styles";

const styles = {
    root: {
        width: 200, 
    },
    
};

function MemoComponent (props: MemoProps) {

    // const [isEdit, setIsEdit] = useState(false);
    const deleteMemo = () => {
        // console.log("Wait lah");
        const url = URL + "/v1/memoboards/" + props.memoboard_id.toString() + "/memos/" + props.id.toString();
        console.log(url);
        fetch(url,
            {
                method: "DELETE",
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error in API call!");
            })
            .then(response => {
                props.update_parent(response);
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
                    body={props.body}
                    category_id={props.category_id}
                    memoboard_id={props.memoboard_id}
                    update_parent={props.update_parent}
                    classes={props.classes}
                    editing={true} />
        ) 
    }
    return (
        <div onClick={updateMemo}>
            <Card className={props.classes.root} key={props.id.toString()} variant="outlined" > 
                <CardContent >
                    <Typography variant="body1">
                        {props.title}
                    </Typography>
                    {/* <p><i>{this.props.category_id}</i></p> */}
                    <Typography variant="body2"
                        style={{wordWrap: "break-word"}}>
                        {props.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => deleteMemo()}>
                        Delete memo
                    </Button>
                </CardActions>
            </Card>
        </div> 
    );
}

export default withStyles((theme: Theme) => styles)(MemoComponent);