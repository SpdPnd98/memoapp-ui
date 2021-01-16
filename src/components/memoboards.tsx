import  { useEffect, useState } from "react";
import { MemoboardProps } from "../model/memoboard";
import { URL } from "../resources/constants";
import Memoboard from "./memoboard";
import { useHistory } from "react-router";
// import { Link, Redirect } from "react-router-dom";

function Memoboards () {
    const [id, setId] = useState<number>(1);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [memoboards, setMemoboards] = useState<MemoboardProps[]>([]);
    const history = useHistory();

    useEffect(() => {
        //fetch memoboards
        const urlMemoboards = URL + "/v1/memoboards";
        fetch(urlMemoboards)
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
                setId(id);
                setIsLoaded(true);
                setMemoboards(response.memoboards);
            })
            .catch(returnIndex);
    }, []);

    const returnIndex = () => {
        history.push({
            pathname: "/",
            state: {
                response: "error!"
            },
        })
    };

        
    const selectMemoboard = (id: number) => {
        const findMemoboard = memoboards.filter((memoboard: MemoboardProps) => memoboard.id === id);
        if (findMemoboard.length === 0) {
            console.log("error with filter!");
            console.log("the value of state id is: " + id)
            return; // wrong index!
        }
        const currentMemoBoard = findMemoboard[0]; //take the first board with matching id
        //fetch corresponding memos
        
        return (
            <Memoboard memoboard_name={currentMemoBoard.memoboard_name} 
                       id={currentMemoBoard.id}
                       />
        );
    }

    const loading = () => {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    
    if(isLoaded === true) {
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