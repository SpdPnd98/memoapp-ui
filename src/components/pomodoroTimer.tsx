import { Button, Dialog, Tab, Tabs } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { PomodoroTimerProps } from "../model/pomodoroTimer";
import { NORMAL_TIMER, SHORT_BREAK, LONG_BREAK } from "../resources/constants";


export default function PomodoroTime(props: PomodoroTimerProps) {

    const [time, setTime] = useState(1500); // access attribute to get the current time.
    const [currentMode, setCurrentMode] = useState(NORMAL_TIMER);
    const [sessions, setSessions] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [audio] = useState(new Audio("/ring.mp3"));
    const [demoMode, setDemoMode] = useState(false);

    const resetSessions = () => {
        setSessions(0);
    }

    const handleClose = () => {
        // timerHolder();
        props.close_timer();
        resetSessions();
        audio.pause();
    }

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTimer(newValue);
        setCurrentMode(newValue);
        setStartTimer(false);
        audio.pause();
        console.log(newValue);
    }

    const generateTabs = () => {
        return (
            <Tabs
             onChange={handleTabChange}
             value={currentMode}
             >
                <Tab label="Start Timer" value={NORMAL_TIMER} />
                <Tab label="Short Break" value={SHORT_BREAK} />
                <Tab label="Long Break" value={LONG_BREAK} />

            </Tabs>
        )
    }

    const setTimer = (newValue: number) => {
        if(demoMode) {
            setTime(5);
            if(newValue === NORMAL_TIMER) setSessions(sessions + 1);
        }
        else if(newValue === NORMAL_TIMER) {
            setTime(25 * 60);
            setSessions(sessions + 1);
        } else if(newValue === SHORT_BREAK) {
            setTime(5 * 60);
        } else if(newValue === LONG_BREAK) {
            setTime(15 * 60);
        }
    }

    useEffect(() => {
        console.log("Create new time in useEffect");
        let interval : any;
        if (startTimer) {
            setTimer(currentMode);
            interval = setInterval(() => setTime(time =>  {
                if(time <= 0) {
                    audio.play();
                    if (currentMode === NORMAL_TIMER && sessions < 3) {
                        console.log("one session!");
                        // time reached 0 for Normal Time, user completed one session
                        // set to short break
                        console.log("jump");
                        setCurrentMode(SHORT_BREAK);
                    } else if (sessions >= 3 && currentMode === NORMAL_TIMER) {
                        console.log("three sessions!");
                        // user ran 3 session, change mode  and reset session
                        resetSessions();
                        setCurrentMode(LONG_BREAK);
                    } else if(currentMode === SHORT_BREAK || currentMode === LONG_BREAK) {
                        setCurrentMode(NORMAL_TIMER);
                    }
                    setStartTimer(false);
                    return 0;
                }
                return time - 1; }
            ), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line 
    }, [startTimer]);

    const handleOnClick = () => {
        setStartTimer(true);
        audio.pause();
    }

    const demoModeSwitch = () => {
        setDemoMode(!demoMode);
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {generateTabs()}
            <h1 style={{textAlign: "center"} as CSSProperties} >
                {Math.floor(time / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
                     + " : " + (time % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false})}</h1>
            <Button onClick={handleOnClick} >Start Time</Button>
            <Button onClick={demoModeSwitch}> Short Demo</Button>
        </Dialog>
    )
};