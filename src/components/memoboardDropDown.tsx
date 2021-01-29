import { MemoboardsDropDownProps } from "../model/memoboards";
import { MemoboardProps } from "../model/memoboard";
import { useState } from "react";
import { createStyles, FormControl, FormHelperText, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import { NEWMEMOBOARD } from "../resources/constants";
import NewMemoboard from "./newMemoboard";

const styles = makeStyles((theme: Theme) => createStyles({
    formControl:{
        marginTop: theme.spacing(5),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(7),
    },
    root: {
        fontSize: "2rem",
    },
}),
);

export default function MemoboardDropDown (props: MemoboardsDropDownProps) {
    const [memoboardId, setMemoboardId] = useState<number | undefined>(props.current_memoboard);
    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [spawnDialog, setSpawnDialog] = useState<boolean>(false);

    const classes = styles();
    const handleSelectMemoboard = (event: any) => {
        console.log(event.target.value);
        setMemoboardId(event.target.value);
        if(event.target.value === NEWMEMOBOARD){
            //activate a dialog to add memoboard, then autoselects it.
            setSpawnDialog(true);
            // console.log("Adding...");
        } else if (event.target.value !== props.current_memoboard) {
            props.update_active_memoboard(event.target.value); //parent needs to set memoboard id and rerender
        }
    }

    const updateMemoboardsAndActive = (payload: MemoboardProps) => {
        props.update_all_memoboards(payload);
        setMemoboardId(payload.id);
    }

    return (
        <>
        <FormControl className={classes.formControl}>
            <Select
                variant="outlined"
                value={memoboardId === null ? "Overview" : memoboardId}
                onChange={handleSelectMemoboard}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className={classes.root}
            >
                <MenuItem key={"Overview-memoboard"} value={undefined}>Overview</MenuItem>
                {props.memoboards.map((memoboard: MemoboardProps) => {
                    return(
                        <MenuItem key={memoboard.id?.toString() + "-memoboard"} value={memoboard.id}>
                        {memoboard.memoboard_name + " Memoboard"}
                    </MenuItem>
                    );
                })}
                <MenuItem key={"Add-memoboard"} value={NEWMEMOBOARD}>Add Memoboard...</MenuItem>
            </Select>
            <FormHelperText>change memoboard...</FormHelperText>
        </FormControl>
        <NewMemoboard
            update_parent={updateMemoboardsAndActive}
            spawn_dialog={setSpawnDialog}
            active={spawnDialog}
        />
        </>
    )

}