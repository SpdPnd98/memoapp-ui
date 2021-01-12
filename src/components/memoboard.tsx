import React from "react";
import {MemoboardProps, MemoboardState} from "../model/memoboard";
import Memos from "./memos";
import { URL } from "../resources/constants";

export default class Memoboard extends React.Component <MemoboardProps, MemoboardState> {
    constructor(props: MemoboardProps) {
        super(props);
        this.state = {
            isLoaded: false, 
        };
    }

    componentDidMount(){
        this.setState({
            isLoaded: true,
        })
    }

    render(){
        if(this.state.isLoaded){
            return (
            <div>
                <h1>{this.props.memoboard_name}</h1>
                <p>Switch a memoboard:</p>
                <Memos memoboard_id={this.props.id}/>
            </div>
            );
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
    }

    errorDialog() {
        console.log("There was a problem with the request for your memos");
        // return (
        //     <p>There was a problem with the request for your memos.</p>
        // )
    }

    loading(){
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
}