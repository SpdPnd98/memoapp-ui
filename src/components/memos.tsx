import React from "react";
import { MemosProps, MemosState } from "../model/memos";
import { MemoProps } from "../model/memo";
import { NewMemo } from "./newMemo";

export default class Memos extends React.Component<MemosProps, MemosState> {
    constructor(props: MemosProps) {
        super(props);
        this.state = {
            isLoaded: false,
            memos: [],
        };
    }

    render () {
        const newMemoFrame = <NewMemo memoboard_id={this.props.memos[0].memoboard_id} update_parent={this.updateMemos.bind(this)}/>;
        if(this.state.isLoaded) {
            if(this.state.memos === null) {
                return (
                    <div>
                        <div>
                            {newMemoFrame}
                        </div>
                        <p>You do not have any memos yet.</p>
                    </div>
                );
            }
            const allMemos = this.state.memos.map((memo:MemoProps) => this.parseMemo(memo));
            return (
                <div>
                    <div>
                        {newMemoFrame}
                    </div>
                    <div>
                        {allMemos}
                    </div>
                </div>
            );
            
        } else {
            return (
                <div>
                    <p>loading your Memos...</p>
                </div>
            );
        }
    }

    componentDidMount() {
        //fetch all memos
        const url = "http://localhost:3000/v1/memoboards/" + this.props.memos[0].memoboard_id.toString() + "/memos";
        // const url = "http://localhost:3000/v1/memoboards/1/memos";
        console.log(url);
        fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Network is not ok.");
            })
            .then(response => {
                console.log(JSON.stringify(response));
                this.setState({
                    isLoaded: true,
                    memos: response.memos,
                })
            })
            .catch(this.errorDialog);
        
    }

    parseMemo(memo: MemoProps) {
        // parse each memo item
        return (
            <div className="colorHere" key="{memo.id}"> 
                <h1>{memo.title}</h1>
                <p><i>{memo.category_id}</i></p>
                <p>{memo.body}</p>
                <button onClick={() => this.deleteMemo(memo.id)}>Delete memo</button>
            </div>
        );
    }

    errorDialog() {
        console.log("There was a problem with the request for your memos");
        // return (
        //     <p>There was a problem with the request for your memos.</p>
        // )
    }

    deleteMemo(id: number){
        console.log("Wait lah");
    }

    updateMemos(event: any) {
        this.setState({
            memos: event.memos,
        });
    }
}