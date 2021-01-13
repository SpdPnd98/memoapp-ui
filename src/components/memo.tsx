import React from "react";
import {MemoProps, MemoState} from "../model/memo";
import { URL } from "../resources/constants";

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Memo (props: MemoProps) {

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

    const updateMemoBody = () => {
        return;
    }

    const updateMemoTitle = () => {
        return;
    }

    return (
        <Card className={"test"} key={props.id.toString()} variant="outlined"> 
            <CardContent>
                <Typography variant="body1">
                    {props.title}
                </Typography>
                {/* <p><i>{this.props.category_id}</i></p> */}
                <Typography variant="body2">
                    {props.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => deleteMemo()}>
                    Delete memo
                </Button>
            </CardActions>
        </Card>
    );
    }
