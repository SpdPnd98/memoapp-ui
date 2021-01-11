import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { MemoboardsProps, MemoboardsState } from "../model/memoboards";
import { MemosProps } from "../model/memos";
import Memos from "./memos";

// for prototyping, redirect to masterboard

class Memoboards extends React.Component<MemoboardsProps, MemoboardsState> {
    constructor(props: MemoboardsProps){
        super(props);
        this.state = {
            id: 0,
            isLoaded: false,
            memoboards: [],
        }
    }

    componentDidMount() {
        //local development
        const url = "http://localhost:3000/v1/memoboards";
        fetch(url)
            .then(response => {
                if(response.ok) {
                    // console.log(JSON.stringify(response.json()));
                    return response.json();
                }
                // console.log(response.text());
                throw new Error("Network was not ok.")
            })
            .then((response: any) => { // temporary solution, expected response is MemoboardProps[]
                const id = 0; // some way to get cached value, default is master memo
                console.log(JSON.stringify(response));
                this.setState({
                    id: id,
                    isLoaded: true,
                    memoboards: response.memoboards,
                })
            })
            .catch(()=>this.props.history.push("/"));
    }

    render() {
        if(this.state.isLoaded) {
            const memosProps = [{
                memoboard_id: 1,
                category_id: 1,
                id: -1,
            }];
            return (
                <div>
                    {this.selectMemoboard(this.state.id)}
                    <Memos memos={memosProps} />
                </div>
            );
        } else {
            return this.loading();
        }
    }

    selectMemoboard(id: number) {
        const currentMemoBoard = this.state.memoboards[id];
        //fetch corresponding memos
        
        return (
            <div>
                <h1>{currentMemoBoard.memoboard_name}</h1>
                <p>Switch a memoboard:</p>
            </div>
        );
    }
    
    goToMaster() {
        return this.selectMemoboard(1);
    }

    loading(){
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
}

export default Memoboards;