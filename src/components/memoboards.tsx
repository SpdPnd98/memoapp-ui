import React from "react";
import { MemoboardProps } from "../model/memoboard";
// import { Link, Redirect } from "react-router-dom";
import { MemoboardsProps, MemoboardsState } from "../model/memoboards";
// import { MemosProps } from "../model/memos";
// import Memos from "./memos";
import { URL } from "../resources/constants";
// import { MemosProps } from "../model/memos";
import Memoboard from "./memoboard";

class Memoboards extends React.Component<MemoboardsProps, MemoboardsState> {
    constructor(props: MemoboardsProps){
        super(props);
        this.state = {
            id: 1,
            isLoaded: false,
            memoboards: [],
        }
    }

    componentDidMount() {
        //local development
        const url = URL + "/v1/memoboards";
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
                const id = 1; // some way to get cached value, default is master memo
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
            return (
                <div>
                    {this.selectMemoboard(this.state.id)}
                </div>
            );
        } else {
            return this.loading();
        }
    }

    selectMemoboard(id: number) {
        const findMemoboard = this.state.memoboards.filter((memoboard: MemoboardProps) => memoboard.id === id);
        if (findMemoboard.length === 0) {
            console.log("error with filter!");
            console.log("the value of state id is: " + this.state.id)
            return; // wrong index!
        }
        const currentMemoBoard = findMemoboard[0]; //take the first board with matching id
        //fetch corresponding memos
        
        return (
            <Memoboard memoboard_name={currentMemoBoard.memoboard_name} 
                       id={currentMemoBoard.id} />
        );
    }

    loading(){
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    // updateMemos(memos: MemosProps){
    //     this.setState({
    //         memos: memos,
    //     })
    // }
}

export default Memoboards;