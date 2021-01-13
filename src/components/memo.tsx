import React from "react";
import {MemoProps, MemoState} from "../model/memo";
import { URL } from "../resources/constants";

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { useStyles } from "../styles/styles";



export default class Memo extends React.Component<MemoProps, MemoState> {
    constructor(props: MemoProps) {
        super(props);
        
    }

    render(){
        // const stylesClass = useStyles();
        return (
            <Card className="test" key={this.props.id.toString()} variant="outlined"> 
                <CardContent>
                    <Typography variant="body1">
                        {this.props.title}
                    </Typography>
                    {/* <p><i>{this.props.category_id}</i></p> */}
                    <Typography variant="body2">{this.props.body}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => this.deleteMemo()}>
                        Delete memo
                    </Button>
                </CardActions>
            </Card>
        );
    }

    deleteMemo(){
        // console.log("Wait lah");
        const url = URL + "/v1/memoboards/" + this.props.memoboard_id.toString() + "/memos/" + this.props.id.toString();
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
                this.props.update_parent(response);
            })
            .catch(e => {
                console.log(e.toString());
            });
        
    }

    updateMemoBody(id:number) {

    }

    updateMemoTitle(id:number) {

    }

}