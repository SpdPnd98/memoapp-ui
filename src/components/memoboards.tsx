import  React, { CSSProperties, useEffect, useState } from "react";
import { MemoboardProps } from "../model/memoboard";
import { URL } from "../resources/constants";
import Memoboard from "./memoboard";
import { useHistory } from "react-router";
import MemoboardDropDown from "./memoboardDropDown";
import { LinearProgress } from "@material-ui/core";
// import { Link, Redirect } from "react-router-dom";

function Memoboards () {
    const [id, setId] = useState<number>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [memoboards, setMemoboards] = useState<MemoboardProps[]>([]);
    const history = useHistory();

    useEffect(() => {
        //fetch memoboards
        if(!isLoaded) {
            const urlMemoboards = URL + "/v1/memoboards";
            fetch(urlMemoboards)
                .then(response => {
                    if(response.ok) {
                        const temp = response.json();
                        // console.log(JSON.stringify(temp));
                        return temp;
                    }
                    // console.log(response.text());
                    throw new Error("Network was not ok.")
                })
                .then((response: any) => { // temporary solution, expected response is MemoboardProps[]
                    // const id = 1; // some way to get cached value, default is master memo
                    // console.log(JSON.stringify(response));
                    if (id !== undefined) {
                        setId(id);
                    }
                    setIsLoaded(true);
                    setMemoboards(response.memoboards);
                })
                .catch(() => {// eslint-disable-next-line
                    history.push({
                        pathname: "/",
                        state: {
                            response: "error!"
                        },
                    })
                });
            }
            else {
                console.log("it is loaded!");
            }// eslint-disable-next-line
    }, [id]);

    const updateActiveMemoboard = (id: number) => {
        console.log(id);
        setIsLoaded(false);
        setId(id);
    }
        
    const selectMemoboard = (id: number | undefined) => {
        console.log(id);
        if (id === undefined) {
            return (
                <div style = {{margin:"0 0 0 7% "} as CSSProperties}>
                    <MemoboardDropDown 
                        update_active_memoboard={updateActiveMemoboard}
                        memoboards={memoboards}/>
                    <Memoboard />
                </div>
            )
        }
        const findMemoboard = memoboards.filter((memoboard: MemoboardProps) => memoboard.id === id);
        if (findMemoboard.length === 0) {
            console.log("error with filter!");
            console.log("the value of state id is: " + id)
            return;// wrong index, return master memoboard
        }
        const currentMemoBoard = findMemoboard[0]; //take the first board with matching id
        //fetch corresponding memos
        
        return (
            <div style = {{padding:"0 0 0 7% ",} as CSSProperties}>
                <MemoboardDropDown 
                            update_active_memoboard={updateActiveMemoboard}
                            memoboards={memoboards}
                            current_memoboard={currentMemoBoard.id}/>
                <Memoboard memoboard_name={currentMemoBoard.memoboard_name} 
                        id={currentMemoBoard.id}
                        />
            </div>
        );
    }

    const loading = () => {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }
    
    if(isLoaded) {
        return (
            <div>
                {selectMemoboard(id)}
            </div>
        );
    } else {
        return loading();
    }
}

export default Memoboards;