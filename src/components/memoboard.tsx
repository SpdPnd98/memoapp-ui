import { useState, useEffect } from "react";
import {MemoboardProps} from "../model/memoboard";
import Memos from "./memos";
import { URL } from "../resources/constants";
import { Fab } from "@material-ui/core";
import PomodoroTimer from "./pomodoroTimer";
import { AccessAlarm } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";

export default function Memoboard(props: MemoboardProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState<Array<any>>([]);

    const loading = () => {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    const updateCategories = (response: any) => {
        console.log("resetting the categories...");
        console.log(JSON.stringify(response));
        setCategories(response);
        setIsLoaded(false);
    }


    useEffect(() => {
        //fetch categories
        if(!isLoaded) {
            const urlCategories = URL + "/v1/categories";
            fetch (urlCategories)
                .then(response => {
                    if(response.ok) {
                        // console.log(urlCategories);
                        // console.log(response.text());
                        return response.json();
                    }
                    // console.log(response.text());
                    throw new Error("Network was not ok.")
                })
                .then((response : any) => {
                    console.log(JSON.stringify(response));
                    setCategories(response);
                    setIsLoaded(true);
                })
                .catch(() => console.log("Error in categories"));
        }
    }, [isLoaded]) //TODO: seems to be issues with passing json around, consider changing to redux


    const [open, setOpen] = useState(false);
    const handleOpenTimer = () => {
        setOpen(true);
    }
    if(isLoaded){
        if (props.id === undefined && props.memoboard_name === undefined) {
            return (
                <div >
                    {/* <h1>Overview</h1> */}
                    {/* <p>Switch a memoboard:</p> */}
                    <Memos categories={categories} 
                        update_categories={updateCategories}/>
                    <Fab onClick={handleOpenTimer} 
                        style={{right: 20, 
                                bottom: 20,
                                left: "auto", 
                                position: "fixed", 
                                backgroundColor: "#F5A360"} as CSSProperties} >
                        <AccessAlarm/>
                    </Fab>
                    <PomodoroTimer
                        open= {open}
                        close_timer ={() => setOpen(false)}
                        />
                </div>
            )
        }
        return (
        <div >
            {/* <h1>{props.memoboard_name + " "} Memoboard</h1> */}
            {/* <p>Switch a memoboard:</p> */}
            <Memos memoboard_id={props.id} 
                   categories={categories} 
                   update_categories={updateCategories}/>
            <Fab onClick={handleOpenTimer} 
                 style={{right: 20, 
                         bottom: 20,
                         left: "auto", 
                         position: "fixed", 
                         backgroundColor: "#F5A360"} as CSSProperties} >
                <AccessAlarm/>
            </Fab>
            <PomodoroTimer
                open= {open}
                close_timer ={() => setOpen(false)}
                />
        </div>
        );
    } else {
        return loading();
    }

    //TODO: add in filtering of categories
}