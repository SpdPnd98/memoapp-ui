import React from "react";
import { NewMemoProps, MemoState } from "../model/memo";

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
    }

    // componentDidMount(){

    // }

    render(){
        return (
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <div>
                        <input
                            type="text"
                            name="title"
                            id="memoTitle"
                            required
                            onChange={this.onChange}
                            ></input>
                    </div>
                    <div>
                        <textarea
                            rows={5}
                            name="body"
                            id="memoBody"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit">Add Memo</button>
                </form>
            </div>
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
}