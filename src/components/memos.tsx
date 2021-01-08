import React from "react";
import { MemosProps, MemosState } from "../model/memos";
import { MemoProps } from "../model/memo";

export default class Memos extends React.Component<MemosProps, MemosState> {
    constructor(props: MemosProps) {
        super(props);
        this.state = {
            isLoaded: false,
            memos: [],
        };
    }

    render () {
        if(this.state.isLoaded) {
            if(this.state.memos === null) {
                return (
                    <p>You do not have any memos yet.</p>
                );
            }
            const allMemos = this.state.memos.map((memo:MemoProps) => this.parseMemo(memo));
            return (
                <div>
                    {allMemos}
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
        //const url = "http://localhost:3000/v1/memoboards/" + this.props.memos[0].memoboard.toString() + "/memos";
        const url = "http://localhost:3000/v1/memoboards/1/memos";
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
            <div className="colorHere"> 
                <h1>{memo.title}</h1>
                <p><i>{memo.category}</i></p>
                <p>{memo.body}</p>
            </div>
        );
    }

    errorDialog() {
        console.log("There was a problem with the request for your memos");
        // return (
        //     <p>There was a problem with the request for your memos.</p>
        // )
    }
}