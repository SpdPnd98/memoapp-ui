import React from "react";
import { MemosProps, MemosState } from "../model/memos";
import { MemoProps } from "../model/memo";
import { NewMemo } from "./newMemo";
import Memo from "./memo";
import { URL } from "../resources/constants";

import { Grid } from "@material-ui/core"

export default class Memos extends React.Component<MemosProps, MemosState> {
    constructor(props: MemosProps) {
        super(props);
        this.state = {
            isLoaded: false,
            memos: [],
        };

        this.updateMemos = this.updateMemos.bind(this);
    }

    render () {
        // this.updateMemos = this.updateMemos.bind(this);
        const newMemoFrame = <NewMemo memoboard_id = {this.props.memoboard_id} 
                                    update_parent  = {this.updateMemos}/>;
        if(this.state.isLoaded) {
            if(this.state.memos.length === 0) {
                return (
                    <Grid container>
                        {newMemoFrame}
                        <p>You do not have any memos yet.</p>
                    </Grid>
                );
            }
            const allMemos = this.state.memos.map((memo:MemoProps) => this.parseMemo(memo));
            return (
                <Grid container>
                    {newMemoFrame}
                    {allMemos}
                </Grid>
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
        const url = URL + "/v1/memoboards/" + this.props.memoboard_id + "/memos";
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
            <Grid item>
                <Memo 
                id={memo.id}
                title={memo.title}
                body={memo.body}
                category_id={memo.category_id}
                memoboard_id={memo.memoboard_id}
                update_parent={this.updateMemos} />
            </Grid>
            
        );
    }

    updateMemos(response: any) {
        console.log("updating array...");
        console.log(JSON.stringify(response));
        this.setState({
            isLoaded: true,
            memos: response.memos,
        });
    }

    errorDialog() {
        console.log("There was a problem with the request for your memos");
        // return (
        //     <p>There was a problem with the request for your memos.</p>
        // )
    }

}