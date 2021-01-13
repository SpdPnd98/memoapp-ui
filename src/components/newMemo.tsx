import React from "react";
import { NewMemoProps, MemoState } from "../model/memo";
import Button from "@material-ui/core/Button";
import { TextField, Card, CardContent, CardActions } from "@material-ui/core";

export class NewMemo extends React.Component<NewMemoProps, MemoState> {
    constructor(props: NewMemoProps) {
        super(props);
        this.state = {
            title: "",
            body: "",
            category_id: 1,
            memoboard_id: 1, 
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    // componentDidMount(){

    // }

    render(){
        return (
            <Card variant="outlined">
                <form onSubmit={event => this.handleSubmit(event)}>
                    <CardContent>
                        <TextField
                            type="text"
                            name="title"
                            id="memoTitle"
                            label="Title"
                            onChange={this.onChange}
                            ></TextField>
                    </CardContent>
                    <CardContent>
                        <TextField
                            multiline
                            rows={5}
                            name="body"
                            id="memoBody"
                            label="Body"
                            onChange={this.onChange}
                            />
                    </CardContent>
                    <CardActions>
                        {this.renderButton()}
                    </CardActions>
                </form>
            </Card>
        );
    }

    handleSubmit(event: any){
        event.preventDefault();
        const url = "http://localhost:3000/v1/memoboards/" + this.props.memoboard_id.toString() +"/memos";
        const {title, body, category_id, memoboard_id} = this.state;

        if(title.length === 0 || body.length === 0) {
            //show popup "create proper memo!"
            return;
        }
        const payload = {
            title,
            body: body.replace(/\n/g, "<br></br>"),
            category_id,
            memoboard_id,
        }

        console.log(payload);
        // let token: any;
        // token = document.querySelector('meta[name="csrf-token"]')!.textContent;
        // if(token === null) {
        //     throw new Error("csrf-token not found!")
        // }
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
                this.props.update_parent(response);
            })
            .catch(error => console.log(error.message));
    }

    onChange(event: any){
        this.setState({ [event.target.name]: event.target.value } as MemoState);
    }

    renderButton(){

        console.log(this.state.title !== "" && this.state.body !== "");
        return (
            <Button type="submit" 
                disabled={!(this.state.title !== "" 
                && this.state.body !== "") }>
            
                Add Memo
                
            </Button>
        );
    }
}