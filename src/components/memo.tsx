import React from "react";
import {MemoProps, MemoState} from "../model/memo";
import { URL } from "../resources/constants";

export default class Memo extends React.Component<MemoProps, MemoState> {
    constructor(props: MemoProps) {
        super(props);
    }

    render(){
        return (
            <div className="colorHere" key="{memo.id}"> 
                <h1>{this.props.title}</h1>
                <p><i>{this.props.category_id}</i></p>
                <p>{this.props.body}</p>
                <button onClick={() => this.deleteMemo()}>Delete memo</button>
            </div>
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